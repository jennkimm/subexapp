var mysql = require("mysql");
const express = require("express");
const router = express.Router();
const dbConn = require("./dbConnection");

router.post("/add", async function (req, res, next) {
  let user_id = req.body.user_id;
  let subject_name = JSON.stringify(req.body.subject_name);
  let subject_id;
  let timetable_number = req.body.timetable_number;
  let wanna_drop = req.body.wanna_drop;

  if (user_id === 0 || subject_name === 0 || timetable_number === 0) {
    req.flash(
      "error",
      "Something went wrong. At least one of column is null which is not supposed to be null"
    );
    res.render("subject/add", {
      subject_id: subject_id,
      subject_name: subject_name,
    });
  }

  dbConn.query(
    "SELECT subject_id FROM subjects WHERE subject_name=" + subject_name,
    function (err, rows, fields) {
      if (err) throw err;
      if (rows.length <= 0) {
        req.flash("error", "Subjects not found with name = " + subject_name);
        res.redirect("/subject");
      } else {
        subject_id = rows[0].subject_id;
        const sugang_form = {
          user_id: user_id,
          subject_id: subject_id,
          timetable_number: timetable_number,
          wanna_drop: wanna_drop,
        };
        dbConn.query(
          "INSERT INTO sugang SET ? ",
          sugang_form,
          function (err, result) {
            if (err) {
              res.send({
                code: 400,
                failed: "error ocurred" + err,
              });
            } else {
              res.send({
                code: 200,
                success: "successfully add sugang",
              });
              console.log("successfully add sugang");
            }
          }
        );
      }
    }
  );
});

router.get("/get/(:id)", function (req, res, next) {
  // user_id 가 수강하고 있는 subject들 가져오기
  let id = JSON.stringify(req.params.id);
  let obj = [];
  dbConn.query(
    "SELECT * FROM sugang WHERE user_id = " + id,
    async function (err, rows, fields) {
      if (err) throw err;
      if (rows.length <= 0) {
        req.flash("error", "Sugang info not found with user_id = " + id);
        res.redirect("/sugang");
      } else {
        async function loop(rows) {
          for (let k of rows) {
            await new Promise(async (resolve) => {
              dbConn.query(
                "SELECT * FROM subjects WHERE subject_id=" + k.subject_id,
                async function (err, rows, fields) {
                  if (err) throw err;
                  if (rows.length <= 0) {
                    obj.push({ ans: "수강 정보에 따른 과목 정보 없음" });
                  } else {
                    let a = {
                        user_id: id,
                        subject_id: k.subject_name,
                        sugang_id: k.sugang_id,
                        timetable_number: k.timetable_number,
                        subject_name: await rows[0].subject_name,
                        wanna_drop: k.wanna_drop
                    }
                    obj.push(a);
                    resolve(obj);
                  }
                }
              );
            });
          }
          await res.send(obj);
        }
        loop(rows);
      }
    }
  );
});

router.post("/update", function (req, res, next) {
    // sugang_id 받아서 정보 업데이트 하기
    let sugang_id = JSON.stringify(req.body.sugang_id);
    let subject_name = JSON.stringify(req.body.subject_name);
    let timetable_number = req.body.timetable_number;
    let user_id = req.body.user_id;
    let wanna_drop = req.body.wanna_drop;

    if (subject_name === 0 || sugang_id === 0 || user_id == 0) {
        req.flash('error', "Something went wrong. At least one of column is null which is not supposed to be null");
        res.send({
            sugang_id: sugang_id,
            subject_name: subject_name
        })
    }
    dbConn.query(
        "SELECT subject_id FROM subjects WHERE subject_name=" + subject_name,
        async function (err, rows, fields) {
            if (err) {
                throw err;
            }
            if (rows.length <= 0) {
                req.flash('error', 'Subjects not found with name = ' + subject_name)
                res.redirect('/sugang')
            } else {
                console.log(rows[0].subject_id);
                const sugang_form2 = {
                    user_id: user_id,
                    subject_id: rows[0].subject_id,
                    timetable_number: timetable_number,
                    wanna_drop: wanna_drop,
                    sugang_id: sugang_id
                }
                dbConn.query('UPDATE sugang SET ? WHERE sugang_id = '+ sugang_id, sugang_form2, function(err, result){
                    if(err) {
                        res.send({
                            "code": 400,
                            "failed": "error ocurred" + err
                        });
                    } else {
                        res.send({
                            "code": 200,
                            "success":"successfully update sugang info"
                        });
                    }
                })
            }
        }
    )
});

router.post("/delete/:id", function (req, res, next) {
  // 수강 정보를 지움
  let id = req.params.id;

  dbConn.query(
    "DELETE FROM sugang WHERE sugang_id = " + id,
    function (err, result) {
      if (err) {
        req.flash("error", err);
        res.redirect("/sugang");
      } else {
        res.send({
          code: 200,
          success: "sugang info deleted sucessfully",
        });
      }
    }
  );
});

module.exports = router;

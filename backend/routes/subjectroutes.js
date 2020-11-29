var mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConn = require('./dbConnection');

 // CRUD routes
/**
 * create
 */
router.post('/add', async function(req, res, next) {
    let subject_id = req.body.id;
    let subject_name = req.body.name;
    let professor = req.body.professor;

    if (subject_id === 0 || subject_name === 0 || professor === 0) {
        req.flash('error', "Something went wrong. At least one of column is null which is not supposed to be null");
        res.render('subject/add', {
            subject_id: subject_id,
            subject_name: subject_name
        })
    }

    for (const curr of req.body.time) {
        const time_form = {
            subject_id: req.body.id,
            date: curr.date,
            begin: curr.begin,
            end: curr.end
        }
        dbConn.query('INSERT INTO time SET ?', time_form, function(err, result) {
            if(err) {
                //req.flash('error', err)
                res.send({
                    "code": 400,
                    "failed":"error ocurred" + err
                });
            } else {
                console.log("successfully add time");
            }
        })
    }

    const form_data = {
        subject_id: subject_id,
        subject_name: subject_name,
        professor: professor
    }

    dbConn.query('INSERT INTO subjects SET ?', form_data, function(err, result){
        if(err) {
            //req.flash('error', err)
            res.send({
                "code": 400,
                "failed":"error ocurred" + err
            });
        } else {
            res.send({
                "code": 200,
                "success":"subjects added sucessfully"
            });
        }
    })
})

/**
 * read
 */
// read by subject id
router.get('/get/(:id)', function(req, res, next) {
    let id = req.params.id;

    dbConn.query('SELECT * FROM subjects WHERE subject_id = ' + id, function(err, rows, fields) {
        if (err)
            throw err;
        if (rows.length <= 0) {
            req.flash('error', 'Subjects not found with id = ' + id)
            res.redirect('/subject')
        }
        else  {
            dbConn.query('SELECT * FROM time WHERE subject_id = ' + id, function(err, rows, fields) {
                let obj = {};
                if (err)
                    throw err;
                if (rows.length <= 0) {
                    obj[0].push("미정");
                } else {
                    rows.map(t => {
                        if (!(t.time_id in obj))
                            obj[t.time_id] = [];
                        obj[t.time_id].push(t);
                    })
                    res.send({
                        subject_id: rows[0].subject_id,
                        subject_name: rows[0].subject_name,
                        professor: rows[0].time,
                        subject_time: obj
                    })
                }
            })
        }
    })
})

//read whole data
router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM subjects ORDER BY subject_id desc', function(err, rows) {
        if (err)
            throw err;
        if (rows.length <= 0) {
            req.flash('error', 'Subjects are not found')
            res.redirect('/subject')
        }
        else  {
            res.send({
                data: rows
            })
        }
    })
})


/**
 * update
 */
router.post('/update/:id', function(req, res, next) {
    let id = req.params.id;
    let subject_name = req.body.name;
    let professor = req.body.professor;
    let time = req.body.subject_time;

    if (subject_name === 0 || professor === 0) {
        req.flash('error', "Something went wrong. At least one of column is null which is not supposed to be null");
        res.send({
            subject_id: id,
            subject_name: subject_name
        })
    }
    for (const curr of time) {
        const time_form2 = {
            subject_id: id,
            time_id: curr.time_id,
            date: curr.date,
            begin: curr.begin,
            end: curr.end
        }
        dbConn.query('UPDATE time SET ? WHERE time_id = ' + curr.time_id, time_form2, function(err, result) {
            if(err) {
                //req.flash('error', err)
                res.send({
                    "code": 400,
                    "failed":"error ocurred" + err
                });
            } else {
                console.log("successfully update time");
            }
        })
    }

    const form_data2 = {
        subject_id: id,
        subject_name: subject_name,
        professor: professor
    }

    dbConn.query('UPDATE subjects SET ? WHERE subject_id = ' + id, form_data2, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.send({
                subject_id: req.params.id,
                subject_name: req.body.name
            })
        } else {
            // res.send({
            //     "code": 200,
            //     "success":"subjects updated sucessfully"
            // });
            console.log("successfully update subject");
            //res.redirect('/subject');
        }
    })
})

 /**
 * delete
 */
router.get('/delete/:id', function(req, res, next) {
    let id = req.params.id;

    dbConn.query('DELETE FROM subjects WHERE subject_id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/subject')
        } else {
            res.send({
                "code": 200,
                "success":"subjects deleted sucessfully"
            });
        }
    })
})


 module.exports = router;
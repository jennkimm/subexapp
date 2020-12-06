var mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConn = require('./dbConnection');

router.post('/add', async function(req, res, next) {
    let user_id = req.body.user_id;
    let subject_name = "이산수학";
    let subject_id;
    let timetable_number = req.body.timetable_number;
    let wanna_drop = req.body.wanna_drop;

    if (user_id === 0 || subject_name === 0 || timetable_number === 0) {
        req.flash('error', "Something went wrong. At least one of column is null which is not supposed to be null");
        res.render('subject/add', {
            subject_id: subject_id,
            subject_name: subject_name
        })
    }

    dbConn.query('SELECT subject_id FROM subjects WHERE subject_name="'+subject_name+'"', function(err, rows, fields){
        if (err)
            throw err;
        if (rows.length <= 0) {
            req.flash('error', 'Subjects not found with name = ' + subject_name)
            res.redirect('/subject')
        }
        else {
            console.log("row = "+rows);
            subject_id = rows[0].subject_id;
            const sugang_form = {
                user_id: user_id,
                subject_id: subject_id,
                timetable_number: timetable_number,
                wanna_drop: wanna_drop
            }
            dbConn.query('INSERT INTO sugang SET ? ', sugang_form, function(err, result) {
                if (err){
                    res.send({
                        "code": 400,
                        "failed":"error ocurred" + err
                    });
                } else {
                    res.send({
                        "code": 200,
                        "success":"successfully add sugang"
                    });
                    console.log("successfully add sugang");
                }
            })
        }
    })



})

module.exports = router;
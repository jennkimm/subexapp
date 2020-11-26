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
    let start_time = req.body.time_from;
    let finish_time = req.body.time_to;
    let professor = req.body.professor;
    let date = req.body.date;

    if (subject_id === 0 || subject_name === 0 || start_time === 0 || finish_time === 0 || professor === 0 || date === 0) {
        req.flash('error', "Something went wrong. At least one of column is null which is not supposed to be null");
        res.render('subject/add', {
            subject_id: subject_id,
            subject_name: subject_name
        })
    }

    const form_data = {
        subject_id: subject_id,
        subject_name: subject_name,
        time_from: start_time,
        time_to: finish_time,
        date: date,
        professor: professor
    }
    dbConn.query('INSERT INTO subjects SET ?', form_data, function(err, result){
        if(err) {
            req.flash('error', err)
            res.send({
                "code": 400,
                "failed":"error ocurred" + error
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
            res.send({
                subject_id: rows[0].subject_id,
                subject_name: rows[0].subject_name,
                date: rows[0].date,
                professor: rows[0].professer,
                start_time: rows[0].time_from,
                finish_time: row[0].time_to
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
    let start_time = req.body.time_from;
    let finish_time = req.body.time_to;
    let professor = req.body.professor;
    let date = req.body.date;

    if (subject_name === 0 || start_time === 0 || finish_time === 0 || professor === 0 || date === 0) {
        req.flash('error', "Something went wrong. At least one of column is null which is not supposed to be null");
        res.send({
            subject_id: id,
            subject_name: subject_name
        })
    }
    const form_data2 = {
        subject_id: id,
        subject_name: subject_name,
        time_from: start_time,
        time_to: finish_time,
        date: date,
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
            res.redirect('/subject');
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
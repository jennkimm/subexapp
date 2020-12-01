var mysql = require('mysql');
var bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const dbConn = require('./dbConnection');

/**
 register
 */
router.post('/register', async function(req ,res){
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hashSync(password, 10)
    var users = {
        "user_id": req.body.id,
        "username": req.body.username,
        "user_number": req.body.user_number,
        "email": req.body.email,
        "password": encryptedPassword
    }
    dbConn.query('INSERT INTO users SET ?',users, function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed":"error ocurred" + error
            })
        } else {
            res.send({
                "code": 200,
                "success":"user registered sucessfully"
            });
        }
    });
})

/**
 login
 */
router.post('/login', async function(req,res){
    var id = req.body.id;
    var password = req.body.password;
    dbConn.query('SELECT * FROM users WHERE user_id = ?',[id], async function (error, results, fields) {
      if (error) {
        console.log("fail\n");
        res.send({
          "code":400,
          "failed": "error occured"
        })
      } else {
        if(results.length >0){
          const comparision = await bcrypt.compare(password, results[0].password)
          if(comparision){
            req.session.userInfo = {
                id: req.body.id
            };
            res.json(req.session.userInfo)
          }
          else{
            res.send({
                "code":204,
                "success":"Id and password does not match"
            })
          }
        }
        else{
            res.send({
                "code":206,
                "success":"Id does not exits"
            });
        }
      }
    });
});

/**
 logout
 */
router.get('/logout', async function(req, res) {
    req.session.destroy(function (err) {
        if (err)
            console.log('logout error!');
        console.log("logout success");
        res.clearCookie('sid');
        res.send('<script>alert("로그아웃 되었습니다!");location.href="/";</script>'); // redirect to somewhere..
    })
})

module.exports = router;
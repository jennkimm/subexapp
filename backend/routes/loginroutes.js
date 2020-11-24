var mysql = require('mysql');
var bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n" + err);
    }
});

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
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
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
    connection.query('SELECT * FROM users WHERE user_id = ?',[id], async function (error, results, fields) {
      if (error) {
        console.log("fail\n");
        res.send({
          "code":400,
          "failed": "error occured"
        })
      }else{
        console.log("success\n");
        if(results.length >0){
          const comparision = await bcrypt.compare(password, results[0].password)
          if(comparision){
            res.send({
                "code":200,
                "success":"login sucessful"
            })
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
exports.logout = async function(req,res) {

}

module.exports = router;
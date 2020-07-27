const connection = require('../config/mysql')
const mailer = require('../util/mailSending')
const bcrypt = require('bcrypt')

const User = class {
    constructor(username, password, email, isveryfied, codeactive, codeexpire) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isveryfied = isveryfied;
        this.codeactive = codeactive;
        this.codeexpire = codeexpire
    }

    signUp(newUser) {
        return new Promise((resolve, reject) => {
            // let sql = `INSERT INTO user.userCredentials SET username =${connection.escape(newUser.username)},
            //     password = ${connection.escape(newUser.password)} , email=${connection.escape(newUser.email)},
            //     isveryfied = ${connection.escape(newUser.isveryfied)} , codeactive = ${connection.escape(newUser.codeactive)},
            //     codeexpire = ${connection.escape(newUser.codeexpire)}`;
            // console.log(sql)
            connection.query('INSERT INTO user.userCredentials SET ?', newUser, (err, rs) => {
                (err) ? reject(err) : resolve(rs);
            })
        })
    }

    sendMail(email, code,username) {
        let link = `${process.env.localentry}/active?code=${code}&username=${username}`;
        let option = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Veryfied account',
            html: 'Please click <a href="' + link + '"> here </a> to activate your account.Note this will expire within 24hours'
        }
        mailer(option);
    }
 // Find Query
    findByEmail(email){
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM user.userCredentials WHERE email = ?' , email , (err , rs)=>{
                (err)?reject(err):resolve(rs)
            })
        })
    }
    findByUsername(username){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user.userCredentials WHERE username = ?' , username , (err, rs)=>{
                (err)?reject(err):resolve(rs)
            })
        })
    }
    findIdByCodeAndUsername(code , username){
        return new Promise((resolve, reject) => {
            connection.query('SELECT iduserCredentials From user.userCredentials Where codeactive = ? AND username = ?'
                ,[code , username],(err ,rs)=>{
                    (err)?reject(err):resolve(rs[0].iduserCredentials)
                })
        })

    }
    changeStatusVeryfied(code , username){
        return new Promise((resolve, reject) => {
            this.findIdByCodeAndUsername(code , username).then((id)=>{
                connection.query('UPDATE user.userCredentials SET isveryfied = 1 WHERE iduserCredentials= ?',[id] , (err ,rs)=>{
                    (err)?reject(err):resolve(rs)
                })
            });
        })
    }
    findHashPass(username){
        return new Promise((resolve, reject) => {
            connection.query("SELECT password FROM user.userCredentials WHERE username = ?", username,
                (err,rs)=>{
                    (err)?reject(err):resolve(rs)
                })
        })
    }
    verifyInfo(user){
        return new Promise((resolve , reject) => {
            this.findHashPass(user.username).then((rs)=>{
                // console.log(rs)
                // console.log(rs[0].password)
                if(rs.length==0) resolve('khong ton tai account');
                else{
                    bcrypt.compare(user.password , rs[0].password).then((check)=>{
                        return (check)?resolve(true):resolve('sai mat khau')
                    })
                }
                }).catch(err=> reject(err))
            })
        }


    // for test
    GetAll() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * From user.users", (err, rs) => {
                (err) ? reject(err) : resolve(rs)
            })
        })

    }
}
module.exports = User
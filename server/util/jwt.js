const jwt = require('jsonwebtoken')

module.exports = {
    generateToken :function (user , secretKey , timeexpire) {
            return new Promise((resolve, reject) => {
                let userdata = {
                    username:user.username ,
                    password : user.password,
                    isveryfied:user.isveryfied
                }
                jwt.sign({data:userdata} , secretKey ,{expiresIn: timeexpire},(err , token)=>{
                    (err)?reject(err):resolve(token);
                } )
            })
    },
    veryfiToken:function(token  , secretKey){
        return new Promise((resolve, reject) => {
            jwt.verify(token , secretKey , (err , decodedtoken)=>{
                (err)?reject(err):resolve(decodedtoken)
            })
        })
    }
}
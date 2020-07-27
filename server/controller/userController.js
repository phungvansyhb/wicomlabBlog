const bcrypt = require('../util/hashPassword')
const jwtUtil = require('../util/jwt')
const User = require('../model/user')

module.exports = {
    Test: (req, res) => {
        let user = new User();
        user.GetAll().then((rs) => {
            if (rs) res.status(200).send(rs)
        }).catch((err) => console.log(err))
    },

    AddUser: (req, res) => {
        if (!req.body) {
            res.status(400).json({
                'status': 'warning',
                'msg': 'Bad content!'
            })
        } else {
            let code = Math.floor(1000000 * Math.random());
            let expiresdate = new Date(Date.now() + 24 * 3600 * 1000);
            let hashPass = bcrypt(req.body.password);
            const newUser = new User(req.body.username, hashPass, req.body.email, 0, code, expiresdate);
            newUser.signUp(newUser)
                .then((rs) => {
                    newUser.sendMail(req.body.email, code, req.body.username);
                    res.status(201).send({'status': 'success', 'msg': "ok , waiting Veryfied Email"})
                    //res.status(200).json({'msg':'add success , waiting verified email'})
                })
                .catch(err => res.status(500).json({'status': '500', 'msg': `error in server ${err}`}))
        }
    },

    ActiveAcc: (req, res, code, username) => {
        let user = new User();
        user.changeStatusVeryfied(code, username).then((rs) => {
            res.redirect(`${process.env.portclient}/login`);

        }).catch((err) => {
            res.redirect(`${process.env.portclient}/verifyemailfalse`)

        })
    },
    ProcessLogin: function(req, res){
        let user = req.body;
        let userItf = new User();
        userItf.verifyInfo(user).then((rs)=>{
            if(rs==true){
                jwtUtil.generateToken(user , process.env.secret , process.env.expiretoken).then((token)=>{
                    jwtUtil.generateToken(user , process.env.secret , process.env.refeshtoken).then((refreshToken)=>{
                        res.status(200).json({'status':true,"msg":"login success" , "token":token , "refreshToken":refreshToken})
                    })
                })
            }
            else res.status(400).json({'status':false,'msg':'login fail' , "err":rs})
            }
        ).catch((err) => {
            res.status(500).json({'status':false,'msg': 'loi server', 'err': err})
        });
    },

    ssRefreshToken: function (req , res) {
        let refreshToken = req.body.refreshToken;


    }
}

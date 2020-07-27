const UserController = require('../controller/userController');
const AuthorMdw = require('../middleware/validateUser');
const AuthenMdw = require('../middleware/verifyToken')
module.exports = (app) => {


    // login , signup
    app.post('/api/v1/signup'
        , (req, res, next) => {
            AuthorMdw.IsValidAccount(req, res, next)
        }
        , (req, res) => {
            UserController.AddUser(req, res)
        });
    app.get('/api/v1/active', (req, res) => {
        let code = req.query.code ;
        let username = req.query.username;
        UserController.ActiveAcc(req, res , code , username)
    })
    app.post('/api/v1/login',(req ,res)=>{UserController.ProcessLogin(req , res)})
    app.post('/api/v1/refreshtoken' , (req , res)=>{UserController.ProcessRefreshToken(req ,res)})
    // for get resources need authen
    app.get('/api/v1/users',(req , res ,next)=>{AuthenMdw.IsAuthen(req , res , next)}, (req, res) => {
        UserController.Test(req, res)
    });
}
const User = require('../model/user')

module.exports = {
    // An invalid acc is has unique username and email
    IsValidAccount: (req, res, next) => {
        let user = new User();
        user.findByEmail(req.body.email)
            .then((rs) => {
                if (rs.length > 0) res.status(401).json({'status':'warning','msg': 'Email is exist'})
                else user.findByUsername(req.body.username)
                    .then((rs) => {
                            if (rs.length > 0) res.status(401).json({'status':'warning','msg': 'Username is exist'})
                            else next();
                        }
                    ).catch((err) => {
                        console.log(err)
                    })
            })
            .catch(err => console.log(err))
    }
}
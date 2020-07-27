const jwtUtil = require('../util/jwt')

module.exports= {
    IsAuthen :async function (req , res , next) {
        const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token'];
        if(tokenFromClient){
            try{
                // thay vi viet jwtUtil.veryfiedToken().then(()=>{})...
                const decode = await jwtUtil.veryfiToken(tokenFromClient , process.env.secret);
                req.token = decode;  // decode.data has info user
                next();  // gan token duoc giai ma vao request va cho di tiep
            }catch (e) {
                return res.status(401).json({
                    "msg":"Unauthorized",
                    "err":e
                })
            }
        }
        else res.status(403).json({"msg":"Require token"})
    },
    // when get token success and pass data to req.token need to check data if user has permission to use resoure
    Author: function(req , res ){

    }
}
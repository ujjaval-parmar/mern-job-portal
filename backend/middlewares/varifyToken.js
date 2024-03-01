const dotenv =  require('dotenv');
const jwt = require('jsonwebtoken');


dotenv.config();

const verifyToken = (req, res, next)=>{
    console.log(req.headers)
    // console.log(process.env.JWT_SECRET)
    if(!req.headers.authorization){ 
        return res.status(403).json({
            status: 'Failed',
            message: 'Auth Error: No Token'
        })
    }

    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data)=>{
        if(err){
            return res.status(403).json({
                status: 'Failed',
                message: 'Auth Error: ',
                error: err.message
            })
        }else{
            req.user = data;
            next();
        }
    })
}


module.exports = verifyToken;
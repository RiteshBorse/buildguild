import jwt from 'jsonwebtoken'
export const authenticate = (req , res , next) => {
    const { token } = req.cookies;
    if(!token){
        return res.status(401).send("Access Denied");
    }
    jwt.verify(token , process.env.SECRET_KEY_JWT , (err , decode)=> {
        if(err){
            return res.status(401).send("Invalid Token");
        }
        req.decode = decode;
        res.status(200).send("Protected Data");
    })
    next()
}
import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next)=> {
    let cookie = null;
    if(req.cookies["x-access-token"]) {
        cookie = req.cookies["x-access-token"].token;
    }
    const token = req.body.token || req.query.token || cookie;

    try {
        if(token) {
            const decoded = jwt.verify(token, config.TOKEN_KEY);
            req.user = decoded;
            console.log("test", req.user);
        }
    }
    catch (err) {
        res.locals.error = "Invalid token";
    }
    return next();
}

export default verifyToken;
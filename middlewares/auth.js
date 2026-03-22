const {getUser} = require("../service/auth");

function checkAuth(req,res,next){
    const sessionId = req.cookies?.sessionId;
    req.user = null;
    if(!sessionId) return next();

    const token = sessionId;
    const user = getUser(token);

    req.user = user ? user : null;
    next();

}

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.status(403).json({error: "Forbidden"});

        next();
    };
}
 
module.exports = {restrictTo,checkAuth};
const {getUser} = require("../service/auth");


async function restrictToLoggedinUserOnly(req,res,next){
    const sessionId = req.cookies.sessionId;
    if(!sessionId){
        return res.status(401).render("login", {error : "Please login to access this page"});
    }

    const userId = getUser(sessionId);
    if(!userId){
        return res.status(401).render("login", {error : "Invalid session. Please login again"});
    }

    req.userId = userId ? userId.id : null;
    next();
}

async function checkAuth(req,res,next){
      const sessionId = req.cookies.sessionId;
    

    const userId = getUser(sessionId);
    

    req.userId = userId ? userId.id : null;
    next();
}

module.exports = {restrictToLoggedinUserOnly,checkAuth};
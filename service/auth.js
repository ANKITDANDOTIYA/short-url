 const jwt = require('jsonwebtoken');
 const secret = "Ankit@987456";

function setUser(user){
    
     return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
     }, secret);
}

function getUser(token){
    if(!token) return null;
    try{
        return  jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}
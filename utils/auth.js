const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET = "demon"

async function generateTokenForUser(id){
    const user = await User.findById(id);
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
    };
    const token = jwt.sign(payload, SECRET);
    return token;
}
function validateToken(token){
    return jwt.verify(token, SECRET)
}
module.exports = {
    generateTokenForUser,
    validateToken
}

const express = require('express');
const router = express.Router();
const {handleUserSignup, handleUserLogin} = require("../controllers/userController");
const {renderUsersBlogs} = require("../controllers/userController");


// GET 

router.get("/logout", (req, res) => {
    return res.clearCookie("token").redirect("/");
});
router.get('/blogs', renderUsersBlogs);
// POST
router.post('/login' , handleUserLogin);
router.post("/signup" , handleUserSignup);

module.exports = router;
const express = require('express');
const router = express.Router();
const{renderLoginPage,renderHomePage,renderSignupPage,renderAboutPage,renderAllBlogsPage} = require("../controllers/staticController")
// GET 
router.get("/", renderHomePage);
router.get("/about-us", renderAboutPage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/blogs", renderAllBlogsPage);

// POST


module.exports = router;
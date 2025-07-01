const multer = require('multer');
const express = require('express');
const router = express.Router();
const Blog = require("../models/blog")
const {renderCreateBlogPage,handleCreateNewBlogPost,renderBlogPostPage} = require("../controllers/blogController")
const {onlyGrantAccessTo} = require("../middlewares/auth")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}-${Date.now()}-${file.originalname}`); // Corrected to use originalname
    },
});

const upload = multer({ storage });

// GET 
router.get("/create", renderCreateBlogPage);
router.get("/view/:id",renderBlogPostPage);
router.post("/delete/:id", onlyGrantAccessTo('Admin'), async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id });
        return res.redirect('/');
    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).send("Error deleting blog");
    }
});
// POST
router.post("/create", upload.single("coverImage"), handleCreateNewBlogPost);
module.exports = router;
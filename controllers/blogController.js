const multer = require('multer');
const express = require('express');
const router = express.Router();
const Blog = require("../models/blog")
const Comment = require("../models/comments")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}-${Date.now()}-${file.originalname}`); // Corrected to use originalname
    },
});

const upload = multer({ storage });
exports.renderCreateBlogPage= function (req, res) {
    res.render("createBlog", {
        user :  req.user,
        
    });
};
/*
exports.handleCreateNewBlogPost = async function (req, res) {
    if (!req.user || req.user.role !== "Admin") {
        return res.status(403).render("createBlog", { error: "Only admins can create blogs." });
    }
    const { title, content } = req.body;
    try {
        if (!title || !content) throw new Error("Title And Content Are Mandatory");
        await Blog.create({
            title,
            content,
            author: req.user._id,
            coverImage: req.file.filename,
        });
        return res.render("createBlog", {
            message: "Blog Created Successfully",
        });
    } catch (error) {
        res.render('createBlog', {
            error,
        });
    }
};
*/
exports.handleCreateNewBlogPost = async function (req, res) {
    if (!req.user || req.user.role !== "Admin") {
        return res.status(403).render("createBlog", { error: "Only admins can create blogs." });
    }
    const { title, content, coverImage } = req.body;
    try {
        if (!title || !content || !coverImage) throw new Error("Title, Content, and Cover Image URL are mandatory");
        await Blog.create({
            title,
            content,
            author: req.user._id,
            coverImage, // now stores the URL
        });
        return res.render("createBlog", {
            message: "Blog Created Successfully",
        });
    } catch (error) {
        res.render('createBlog', {
            error,
        });
    }
};
exports.renderBlogPostPage = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id).populate('author');
        const comments = await Comment.find({ blogId: blog._id }).populate('createdBy');
        return res.render("blog", {
            user: req.user,
            blog,
            comments,
        });
    } catch (error) {
        console.error("Error rendering blog post page:", error);
        res.render('home', {
            user: req.user,
            blogs: [], // Pass an empty array to avoid undefined error
        });
    }
}
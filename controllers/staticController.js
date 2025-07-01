const Blog = require('../models/blog')
exports.renderHomePage = async function(req,res){
    const allBlogs = await Blog.find({}).populate('author')
    return res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
}

exports.renderAboutPage = function(req,res){
    return res.render("about",{
        user: req.user,
    });
}
exports.renderLoginPage = function(req,res){
    if(req.user){
        return res.redirect("/");
    }
    return res.render("login");
}

exports.renderSignupPage = function(req,res){
    if(req.user){
        return res.redirect("/");
    }
    
    return res.render("signup");
}

exports.renderAllBlogsPage = async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .populate("author", "fullName")
            .sort({ createdAt: -1 });
        res.render("allBlogs", { blogs });
    } catch (error) {
        res.render("allBlogs", { blogs: [], error: "Could not fetch blogs." });
    }
};
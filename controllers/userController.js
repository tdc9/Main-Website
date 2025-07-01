const User = require("../models/user");
const Blog = require("../models/blog");
const {generateTokenForUser} = require("../utils/auth")

exports.handleUserLogin = async function(req,res){
    const {email, password} = req.body;
    try{
        if(!email) throw new Error("Email is required");
        if(!password) throw new Error("Password is required");
        const user = await User.findOne({email});
        if (!user) throw new Error(`User with email ${email} does not exist`);
        if(user.password !== password) throw new Error("Incorrect Password");
        
        //Token
        const token = await generateTokenForUser(user._id);
        return res.cookie("token", token).redirect("/");
    } catch(err){
        res.render("login", {message : err.message});
    };
}

exports.handleUserSignup = async function(req,res){
    const {fullName, email, password} = req.body;
    try{
        if(!fullName) throw new Error("Full Name is required");
        if(!email) throw new Error("Email Name is required");
        if(!password || password.length < 5 ) throw new Error("Password is required and must be at least 5 characters long");

        const user = await User.create({fullName, email, password });
        const token = await generateTokenForUser(user._id);
        return res.cookie("token", token).redirect("/");
    } catch(err){
        res.render("signup", {message : err.message});
    }
}

exports.renderUsersBlogs = async (req, res) => {
    if (!req.user) return res.redirect("/login")
    const blogs = await Blog.find({author : req.user._id})
    return res.render("userBlogs", {
        user: req.user,
        blogs,
    });
};

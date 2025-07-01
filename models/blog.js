const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type: String,
        required: 'true',
    },
    content : {
        type: String,
        required : 'true',
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        
    },
    
    coverImage : {
        type: String,
        default: 'https://example.com/default-cover.jpg', // Default image URL
        required: 'true', // Ensure coverImage is always provided
    },
},{ timestamps : true});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
const express = require('express');
router = express.Router();
const app = express();

const Comment = require('../models/comments')


router.post('/create',async (req, res)=> {
    if (!req.user) return res.json({error:"You Are Not Logged In"})
    const {blogId, content}  = req.body
    await Comment.create({blogId, content, createdBy : req.user._id})
    return res.json({message:"Comment Created Successfully"})
})

module.exports = router;
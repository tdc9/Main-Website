const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({des : "public/uploads"})
const userRouter = require('./routers/userRoutes');
const blogRouter = require('./routers/blogRoutes');
const staticRouter = require('./routers/staticRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {checkForToken} = require("./middlewares/auth");
const commentRouter= require('./routers/commentRoutes');
const uri = "Place Your MongoDB Key Here";


// Configuratiions
const app = express();
mongoose
    .connect(uri)
    .then(() => {console.log('Database Connected');})
    .catch((err) => {console.log('Error in connecting to database', err);});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


// Middlewares
app.use(express.static(path.resolve('./public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(cookieParser());
app.use(checkForToken);




// Register The Routes

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/', staticRouter);
app.use('/comment',commentRouter);


// Listner
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
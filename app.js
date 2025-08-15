require('dotenv').config();

const express = require('express');
const app= express();
const methodOverride = require('method-override');
const path= require('path');
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));

const Listing =  require('./models/listings');

const passport = require('passport');
const localStrategy = require('passport-local');
const user = require('./models/user')

app.use(methodOverride('_method'));

const session = require('express-session');
const flash= require('connect-flash');
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 24 * 3600,
    crypto: {
        secret: process.env.SESSION_SECRET
    }
});
const sessionOption = {
    store: store,
    secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now() + 7 *24 *60 *60 *1000,
        maxAge : 7 *24 *60 *60 *1000,
        httpOnly: true,
    }
}

store.on('error', function(e){
    console.log("session store error",e);
});
app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser()); 

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})



const listingsRouter= require('./routes/listing');
const reviewsRouter= require('./routes/review');
const usersRouter= require('./routes/user');

app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));


main().then(()=>{
    console.log("mongoose connected");
}).catch((err)=>{
    console.log("error",err);
})

async function main(){
    await mongoose.connect(process.env.DB_URL);
}

const ejsMate = require('ejs-mate');
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));




app.get("/",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});
app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter); 

app.use('/', usersRouter);




app.listen(3000,()=>{
    console.log("server is listening to port 3000")
});
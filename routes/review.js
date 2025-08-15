const express= require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync');
const Listing =  require('../models/listings');
const Review = require('../models/review');
const {validateReview,isLoggedIn,isAuthor} = require('../middleware');
const {postReview,deleteReview} = require('../controllers/review');



router.post('/',isLoggedIn,validateReview,wrapAsync(postReview));
router.delete("/:reviewId", [isLoggedIn, isAuthor], wrapAsync(deleteReview));



module.exports= router;
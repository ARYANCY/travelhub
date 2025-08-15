const express= require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {isLoggedIn,validateListing,isOwner} = require('../middleware')
const {index,showListings,getNewListings,postNewListings,getEditListings,putEditListings,deleteListings,getSearchResults} = require('../controllers/listing');
const multer  = require('multer')

const {cloudinary, storage} = require('../cloudConfig');
const { get } = require('mongoose');
const upload = multer({ storage: storage });

router.route('/')
    .get(isLoggedIn, wrapAsync(index))
    .post([isLoggedIn, validateListing,upload.single('listing[image]')], wrapAsync(postNewListings));

router.route('/new')
    .get(isLoggedIn, wrapAsync(getNewListings));

router.route('/show/:id')
    .get(wrapAsync(showListings));

router.route('/:id')
    .put([isLoggedIn,isOwner,validateListing,upload.single('listing[image]')],wrapAsync(putEditListings))
    .delete([isLoggedIn,isOwner],wrapAsync (deleteListings));

router.route("/:id/edit")
    .get(isLoggedIn, isOwner, wrapAsync(getEditListings));

router.get("/search", getSearchResults);


module.exports = router;
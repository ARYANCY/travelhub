const {reviewSchema,listingSchema} = require('./schema');
const ExpressError = require('./utils/ExpressError');
const Listing = require('./models/listings');
const Review = require('./models/review');

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        if (req.method === 'GET') {
             req.session.redirectUrl = req.originalUrl;
         }
        req.flash("error","you must be logged in to create listings!");
        return res.redirect("/signin");
    }
    next();
}

module.exports.saveRedirectUrl =(req,res,next)=>{
 if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;

 }
 next();
}
module.exports.validateListing = ((req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new   ExpressError(400,errMsg);
    }else{
        next();
    }
});
module.exports.validateReview = ((req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new   ExpressError(400,errMsg);
    }else{
        next();
    }
});


module.exports.isOwner= async(req,res,next)=>{
    const { id } = req.params;
    const foundListing = await Listing.findById(id);
    if (!foundListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if(!foundListing.owner.equals(req.user._id)){
        req.flash("error","you don't have access to edit");
        return res.redirect(`/listings/show/${id}`)
    }
    
    next(); 
}
module.exports.isAuthor = async (req, res, next) => {
    const { reviewId, id } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/show/${id}`);
    }

    if (!req.user || !review.author || !req.user._id.equals(review.author._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/listings/show/${id}`); 
    }

    next();
};

const Listing = require('../models/listings');
const Review = require('../models/review');

module.exports.postReview = async(req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id);
    let newReview= new Review(req.body.review);
    newReview.author = req.user._id;
    listing.Reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/show/${listing.id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/show/${id}`);
}
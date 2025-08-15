const Listing = require('../models/listings');
const Review = require('../models/review');

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.showListings=async(req,res)=>{
    const showListings = await Listing.findById(req.params.id).populate({
            path: 'Reviews',
            populate: { path: 'author' }
        }).populate('owner');
    if(!showListings){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings")
    }
    return res.render("listings/show.ejs",{showListings});
}
module.exports.getNewListings = async(req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.postNewListings = async (req, res) => {
    const newListings = new Listing(req.body.listing);
    newListings.owner = req.user._id;
 
    if(req.file){
        newListings.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    }


    await newListings.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
}


module.exports.getEditListings=   async(req,res)=>{
    const editListing= await Listing.findById(req.params.id);
    if(!editListing){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings")
    }
    return res.render("listings/edit.ejs",{editListing});
}

module.exports.putEditListings = async (req, res) => {
    const { listing } = req.body;
    const { id } = req.params;

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await Listing.findByIdAndUpdate(id, listing);
    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/show/${id}`);
};

module.exports.deleteListings = async(req,res)=>{
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success","Listing deleted successfully");
    res.redirect('/listings');
}

module.exports.getSearchResults =async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim() === "") {
    req.flash("error", "Please enter a search term.");
    return res.redirect("/");
  }

  const results = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } }
    ]
  });

  res.render("listings/searchresult.ejs", { results, query });
}
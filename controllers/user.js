const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup =async(req,res)=>{
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ email, username });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "User registered successfully!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderSigninForm =(req,res)=>{
    res.render("users/signin.ejs");
}
module.exports.signin = async(req, res)=>{
        req.flash("success", "Welcome back!");
        res.redirect(res.locals.redirectUrl || '/listings');
}
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out!");
        res.redirect('/listings');
    });
}
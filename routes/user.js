const express= require('express');
const router = express.Router();
const passport =require('passport');
const {saveRedirectUrl} = require('../middleware');

const {renderSignupForm,signup,renderSigninForm,signin,logout} = require('../controllers/user');

router.route("/signup")
    .get(renderSignupForm)
    .post(signup);

router.route("/signin")
    .get(renderSigninForm)
    .post(saveRedirectUrl, passport.authenticate('local', { 
        failureRedirect: '/signin',
        failureFlash: true,
    }), signin);

router.route('/logout')
    .get(logout);

module.exports = router;
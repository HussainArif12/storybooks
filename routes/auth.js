const express= require('express');
const router = express.Router();
const passport = require('passport')
//@desc Login/Landing page
//@page GET /

router.get('/google' , passport.authenticate('google', {scope: ['profile']}));


//GET to dashboard
router.get('/google/callback' , passport.authenticate('google',{ failureRedirect: '/'}),
(req,res)=>{
    res.redirect('/dashboard')
})
 
module.exports = router;
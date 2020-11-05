const express= require('express');
const router = express.Router();

//@desc Login/Landing page
//@page GET /

router.get('/google' , passport.authenticate('google', {scope: ['profile']}));


//GET to dashboard
router.get('/auth/google/callback' , passport.authenticate('google',{ failureRedirect: '/auth/google/failure'}),
(req,res)=>{
    res.redirect('/dashboard')
})
 
module.exports = router;
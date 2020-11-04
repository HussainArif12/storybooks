const express= require('express');
const router = express.Router();

//@desc Login/Landing page
//@page GET /

router.get('/google' , passport.authenticate('google', {scope: [email,[profile]]}));


//GET to dashboard
router.get('/auth/google/callback' , passport.authenticate('google',{
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
}))

module.exports = router;
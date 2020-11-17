const express= require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const Story = require('../models/Story');
//@desc Login/Landing page
//@page GET /

router.get('/' , ensureGuest, (req,res)=>{
    res.render('login', {layout: 'login'});
})

//GET to dashboard
router.get('/dashboard' ,ensureAuth, (req,res)=>{
    try {
        const stories = await Story.find()
    } catch(err){
        console.log(err);
    }
    res.render('dashboard',{name : req.user.firstName});
}) 

module.exports = router;

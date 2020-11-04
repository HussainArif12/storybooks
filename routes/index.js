const express= require('express');
const router = express.Router();

//@desc Login/Landing page
//@page GET /

router.get('/' , (req,res)=>{
    res.render('login', {layout: 'login'});
})

//GET to dashboard
router.get('/dashboard' , (req,res)=>{
    res.render('dashboard');
}) 

module.exports = router;
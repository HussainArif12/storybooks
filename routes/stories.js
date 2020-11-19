const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Story = require("../models/Story");

//@desc Login/Landing page
//@page GET /
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

router.post('/', ensureAuth,async(req,res)=>{
  try{
  req.body.user = req.user.id;
  console.log(req.body);
  await Story.create(req.body);
  res.redirect('/dashboard');
  }catch(err){
    console.log(err);
    res.render('error/500');
  }
})


module.exports = router;
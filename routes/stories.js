const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Story = require("../models/Story");

//@desc Login/Landing page
//@page GET /
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

router.get("/", ensureAuth, async(req, res) => {
  try{
    const stories = await Story.find({status : 'public'})
    .populate('user')
    .sort({createdAt : 'desc'})
    .lean();
    console.log(stories);
    res.render('stories/index',{
      stories
    })
  }catch(err){ 
    console.log(err);
  }
});

router.get('/edit/:id',ensureAuth, async(req,res)=>{
  const story = await Story.findOne({
    _id : req.params.id
  }).lean()
  console.log(story)
  if(!story) {
    return res.render('error/404');
  }
  if(story.user != req.user.id) {
    res.redirect('/stories')
  } else {
    res.render('stories/edit', {
      story
    })
  }
})

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

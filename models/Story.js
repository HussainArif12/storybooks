const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StorySchema = new Schema({
   title : {
       type : String,
       required: true,
       trim: true //trim whitespace
   } , 
   body : {
    type : String,
    required: true
} ,
status : {
    type : String,
    default: 'public',
    enum :['public', 'private'] //can be either of the two values
} ,
user : {
    type : mongoose.Schema.Types.ObjectId, //users connected to this story
    ref : 'User'
},
createdAt:{
    type: Date,
    default : Date.now
}    
})

module.exports = mongoose.model("Story",StorySchema ); 
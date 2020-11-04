const mongoose = require('mongoose');
const MONGO_URI='mongodb+srv://hussaina123:hussaina123@cluster0.wcdxm.mongodb.net/storybooks?retryWrites=true&w=majority'
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(MONGO_URI
            , {
                useNewUrlParser : true ,
                useUnifiedTopology : true,
                useFindAndModify : false
            })
        console.log(`MONGODB Connected : ${conn.connection.host}`);
    }catch(err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectDB;

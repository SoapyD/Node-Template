
const mongoose = require("mongoose");

exports.connect = () => {

    //setup mongoose connection
    mongoose.connect("mongodb+srv://admin:"+process.env.MONGO_DB_PASS+"@cluster0.cvy6a.azure.mongodb.net/"+process.env.MONGO_DB_NAME+"?retryWrites=true&w=majority", 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
    ).then(() => {
        console.log('Connected to DB!');
    }).catch(err => {
        console.log("Error:", err.message);
    })  //will create cat app is it doesn't already exist    
}

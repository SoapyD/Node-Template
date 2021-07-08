if(!process.env.INSTANCE_TYPE){
    //NEEDS REMOVING WHEN A LIVE UPLOAD IS NEEDED
    require('dotenv').config()
      console.log("dev env variables loaded")	  
  }
  
const express = require("express");
const app = express();

const middleware = require('./middleware');
middleware.setup.setupApp(app)





// app.listen(80, function(){
app.listen(process.env.PORT||80, process.env.IP, function(){	
    console.log("Server has started!")
});
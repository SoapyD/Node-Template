const mongoose = require("mongoose");
// const User = require("../models/user");


const roomSchema = new mongoose.Schema({

	// ,author: {
	// 	id: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	},
	// 	user_name: String
    // }

    room_number: Number
    ,text: String
    ,size: String
    ,found: {type: Boolean, default: true}
	,points: [{
		x: {type: Number, default: 0}
		,y: {type: Number, default: 0}
	}]    
         
    ,doors: 
    [{
        direction: String
        ,points: [{
		x: {type: Number, default: 0}
		,y: {type: Number, default: 0}
        }]
    }]       

   ,created_date: {type: Date, default: Date.now}
   ,updateddate: {type: Date, default: Date.now}	
	
});


module.exports = mongoose.model("Room", roomSchema);
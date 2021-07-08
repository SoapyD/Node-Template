
const queries = require("./queries");
const models = require("../models");

exports.removeAllRooms = async() => {
    //Remove all products
    models.Room.remove({}, function(err){
         if(err){
             console.log(err);
         }
         else{
             console.log("removed rooms");
         }
        
     }); 
     //add a few comments
 }





exports.populate = async() => {

    await exports.removeAllRooms();

    let options;
    let data = {
        model: "Room",
        params: []
    }

    small_tile = 25;

    for(let i=0;i<=47;i++){

        options = {
            small_tile_size: small_tile
            ,small_door_depth_offset: 15
            ,large_tile_size: small_tile * 1.3
            ,large_door_depth_offset: 15 * 1.3            
        };
        options.room_number = i
        options.points = []
        options.doors = []
        exports.getRoom(options)

        data.params.push(options)
    }

    await queries.create(data)
    console.log("rooms created")
}




exports.getDoor = (options) => {

    let door;

    //x1,y1 , x2, y2 
    switch(options.type){
        case "t":
            // UP - HIGH/LOW
            door = {
                direction: 't',
                points: []
            }
            door.points.push({x: options.x2, y: options.y1})
            door.points.push({x: options.x2, y: options.y1-1, yA:1})
            door.points.push({x: options.x1, y: options.y1-1, yA:1})
            door.points.push({x: options.x1, y: options.y1})                
            break;
        case "r":
            // RIGHT - LOW/HIGH
            door = {
                direction: 'r',
                points: []
            }
            door.points.push({x: options.x1, y: options.y1})
            door.points.push({x: options.x1+1, y: options.y1, xA:-1})
            door.points.push({x: options.x1+1, y: options.y2, xA:-1})
            door.points.push({x: options.x1, y: options.y2})                        
            break;                    
        case "b":
            // DOWN - LOW/HIGH
            door = {
                direction: 'b',
                points: []
            }
            door.points.push({x: options.x1, y: options.y1})
            door.points.push({x: options.x1, y: options.y1+1, yA:-1})
            door.points.push({x: options.x2, y: options.y1+1, yA:-1})
            door.points.push({x: options.x2, y: options.y1})                
            break;  
        case "l":
            // LEFT - HIGH/LOW
            door = {
                direction: 'l',
                points: []
            }
            door.points.push({x: options.x1, y: options.y1})
            door.points.push({x: options.x1-1, y: options.y1, xA:1})
            door.points.push({x: options.x1-1, y: options.y2, xA:1})
            door.points.push({x: options.x1, y: options.y2})                
            break;                        
    }

    return door;
}



exports.getRoom = (options) => {

    let door;
    options.found = false;

    switch(options.room_number){

        case 0: 
            options.text = "start"
            options.size = "small"
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:1})
            options.points.push({x:2.5, y:1})
            options.points.push({x:2.5, y:2})
            options.points.push({x:0.5, y:2})
            options.points.push({x:0.5, y:1})
            options.points.push({x:0, y:1})                                                                

            door = exports.getDoor({type: "b", x1: 1,y1: 2,x2: 2, y2:2})
            options.doors.push(door)       
            
        break;

        case 1:
            options.text = "big rock"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:6, y:0})
            options.points.push({x:6, y:5})
            options.points.push({x:5, y:5})
            options.points.push({x:5, y:6})
            options.points.push({x:4, y:6})
            options.points.push({x:4, y:7})
            options.points.push({x:2, y:7})
            options.points.push({x:2, y:6})
            options.points.push({x:0, y:6})                                  
            
            door = exports.getDoor({type: "t", x1: 2,y1: 0,x2: 3, y2:0})
            options.doors.push(door) 
            door = exports.getDoor({type: "r", x1: 6,y1: 3,x2: 6, y2:4})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 2.5,y1: 7,x2: 3.5, y2:7})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 3,x2: 0, y2:4})
            options.doors.push(door)                                                              

        break;

        case 2:
            options.text = "warp room"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:2})
            options.points.push({x:2.5, y:2})
            options.points.push({x:2.5, y:4})
            options.points.push({x:0.5, y:4})
            options.points.push({x:0.5, y:2})
            options.points.push({x:0, y:2})

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)              
            door = exports.getDoor({type: "l", x1: 0,y1: 0.5,x2: 0, y2:1.5})
            options.doors.push(door)   
            door = exports.getDoor({type: "r", x1: 3,y1: 0.5,x2: 3, y2:1.5})
            options.doors.push(door)                           
            door = exports.getDoor({type: "b", x1: 1,y1: 4,x2: 2, y2:4})
            options.doors.push(door)             
        break;          
        
        case 3:
            options.text = "statues"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0.25}) 
            options.points.push({x:1, y:0.25})
            options.points.push({x:1, y:0})
            options.points.push({x:5, y:0})
            options.points.push({x:5, y:0.25})
            options.points.push({x:6, y:0.25})
            options.points.push({x:6, y:2.25})
            options.points.push({x:5, y:2.25})
            options.points.push({x:5, y:2.5})   
            options.points.push({x:4, y:2.5})  
            options.points.push({x:4, y:3.25})
            options.points.push({x:2, y:3.25})
            options.points.push({x:2, y:2.5})
            options.points.push({x:1, y:2.5})
            options.points.push({x:1, y:2.25})
            options.points.push({x:0, y:2.25})

            door = exports.getDoor({type: "t", x1: 2.5,y1: 0,x2: 3.5, y2:0})
            options.doors.push(door)             
            door = exports.getDoor({type: "r", x1: 6,y1: 0.75,x2: 6, y2:1.75})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 2.5,y1: 3.25,x2: 3.5, y2:3.25})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 0.75,x2: 0, y2:1.75})
            options.doors.push(door)   

        break;
        
        case 4:
            options.text = "plague coffin"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:3})
            options.points.push({x:4, y:3})
            options.points.push({x:4, y:5})
            options.points.push({x:3, y:5})
            options.points.push({x:3, y:6})
            options.points.push({x:1, y:6})
            options.points.push({x:1, y:5})
            options.points.push({x:0, y:5})                                  
            
            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door) 
            door = exports.getDoor({type: "r", x1: 4,y1: 3.5,x2: 4, y2:4.5})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 1.5,y1: 6,x2: 2.5, y2:6})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)                            
            door = exports.getDoor({type: "l", x1: 0,y1: 3,x2: 0, y2:4})
            options.doors.push(door)
        break;        

        case 5:
            options.text = "burial"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0.25, y:0}) 
            options.points.push({x:2.25, y:0})
            options.points.push({x:2.25, y:1})
            options.points.push({x:3, y:1})
            options.points.push({x:3, y:3})
            options.points.push({x:2, y:3})
            options.points.push({x:2, y:6})
            options.points.push({x:0, y:6})
            options.points.push({x:0, y:1})
            options.points.push({x:0.25, y:1})                                  
            
            door = exports.getDoor({type: "r", x1: 3,y1: 1,x2: 3, y2:2})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 0.5,y1: 6,x2: 1.5, y2:6})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 4,x2: 0, y2:5})
            options.doors.push(door)                            
        break;        

        case 6:
            options.text = "statue"
            options.size = "small"            
            options.found = true;
            options.points.push({x:1, y:0}) 
            options.points.push({x:6, y:0})
            options.points.push({x:6, y:1})
            options.points.push({x:7, y:1})
            options.points.push({x:7, y:5})
            options.points.push({x:6, y:5})
            options.points.push({x:6, y:6})
            options.points.push({x:1, y:6})
            options.points.push({x:1, y:5})   
            options.points.push({x:0, y:5})  
            options.points.push({x:0, y:1})
            options.points.push({x:1, y:1})

            door = exports.getDoor({type: "t", x1: 2,y1: 0,x2: 3, y2:0})
            options.doors.push(door) 
            door = exports.getDoor({type: "t", x1: 4,y1: 0,x2: 5, y2:0})
            options.doors.push(door)             
            door = exports.getDoor({type: "r", x1: 7,y1: 1,x2: 7, y2:2})
            options.doors.push(door) 
            door = exports.getDoor({type: "r", x1: 7,y1: 4,x2: 7, y2:5})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 3,y1: 6,x2: 4, y2:6})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 4,x2: 0, y2:5})
            options.doors.push(door)             
        break;

        case 7:
            options.text = "bloody floor"
            options.size = "small"            
            options.found = true;
            options.points.push({x:1, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:1})
            options.points.push({x:4, y:1})
            options.points.push({x:4, y:3})
            options.points.push({x:3, y:3})
            options.points.push({x:3, y:4})
            options.points.push({x:1, y:4})
            options.points.push({x:1, y:3})   
            options.points.push({x:0, y:3})  
            options.points.push({x:0, y:1})
            options.points.push({x:1, y:1})

            door = exports.getDoor({type: "t", x1: 1.5,y1: 0,x2: 2.5, y2:0})
            options.doors.push(door)         
            door = exports.getDoor({type: "r", x1: 4,y1: 1.5,x2: 4, y2:2.5})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 1.5,y1: 4,x2: 2.5, y2:4})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 1.5,x2: 0, y2:2.5})
            options.doors.push(door) 
        break;        

        case 8:
            options.text = "switches"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:1})
            options.points.push({x:4, y:1})
            options.points.push({x:4, y:5})
            options.points.push({x:3.25, y:5})
            options.points.push({x:3.25, y:7})
            options.points.push({x:1.25, y:7})
            options.points.push({x:1.25, y:5})   
            options.points.push({x:1, y:5})  
            options.points.push({x:1, y:2})
            options.points.push({x:0, y:2})

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)         
            door = exports.getDoor({type: "r", x1: 4,y1: 2.5,x2: 4, y2:3.5})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 2,y1: 7,x2: 3, y2:7})
            options.doors.push(door) 
        break;                

        case 9:
        case 10:             
            options.text = "alley"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:5})
            options.points.push({x:0, y:5})

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door) 
            door = exports.getDoor({type: "r", x1: 2,y1: 1,x2: 2, y2:2})
            options.doors.push(door) 
            door = exports.getDoor({type: "r", x1: 2,y1: 3,x2: 2, y2:4})
            options.doors.push(door)                         
            door = exports.getDoor({type: "b", x1: 0.5,y1: 5,x2: 1.5, y2:5})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 3,x2: 0, y2:4})
            options.doors.push(door)             
        break;

        case 11:
        case 12:
        case 13:                            
            options.text = "small square"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:2})
            options.points.push({x:0, y:2})

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)         
            door = exports.getDoor({type: "r", x1: 2,y1: 0.5,x2: 2, y2:1.5})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 0.5,y1: 2,x2: 1.5, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 0.5,x2: 0, y2:1.5})
            options.doors.push(door)             
        break;

        case 14:
        case 15:                            
            options.text = "medium square"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:3})
            options.points.push({x:0, y:3})

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)         
            door = exports.getDoor({type: "r", x1: 3,y1: 1,x2: 3, y2:2})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 1,y1: 3,x2: 2, y2:3})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)             
        break;        

        case 16:
        case 17:
        case 18:                             
            options.text = "alley 2"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:4})
            options.points.push({x:0, y:4})

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door) 
            door = exports.getDoor({type: "r", x1: 2,y1: 1.5,x2: 2, y2:2.5})
            options.doors.push(door) 
            door = exports.getDoor({type: "b", x1: 0.5,y1: 4,x2: 1.5, y2:4})
            options.doors.push(door) 
            door = exports.getDoor({type: "l", x1: 0,y1: 1.5,x2: 0, y2:2.5})
            options.doors.push(door)                               
        break;      
        
        case 19:
        case 20:                             
            options.text = "alley big"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:5})
            options.points.push({x:0, y:5})

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 1,x2: 3, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 3,x2: 3, y2:4})
            options.doors.push(door)             
            door = exports.getDoor({type: "b", x1: 1,y1: 5,x2: 2, y2:5})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)      
            door = exports.getDoor({type: "l", x1: 0,y1: 3,x2: 0, y2:4})
            options.doors.push(door) 
        break;      
        
        case 21:
        case 22:                             
            options.text = "big room 1"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:4, y:0})
            options.points.push({x:4, y:4})
            options.points.push({x:0, y:4})

            door = exports.getDoor({type: "t", x1: 1.5,y1: 0,x2: 2.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 1.5,x2: 4, y2:2.5})
            options.doors.push(door)             
            door = exports.getDoor({type: "b", x1: 1.5,y1: 4,x2: 2.5, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1.5,x2: 0, y2:2.5})
            options.doors.push(door)       
        break;     
        
        case 23:                             
            options.text = "study"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:5, y:0})
            options.points.push({x:5, y:5})
            options.points.push({x:0, y:5})

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "t", x1: 3,y1: 0,x2: 4, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 5,y1: 1,x2: 5, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 5,y1: 3,x2: 5, y2:4})
            options.doors.push(door)            
            door = exports.getDoor({type: "b", x1: 1,y1: 5,x2: 2, y2:5})
            options.doors.push(door)
            door = exports.getDoor({type: "b", x1: 3,y1: 5,x2: 4, y2:5})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 3,x2: 0, y2:4})
            options.doors.push(door)            
        break;         
        
        case 24:                             
            options.text = "blood well"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:3})
            options.points.push({x:0, y:3})

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 2,y1: 1,x2: 2, y2:2})
            options.doors.push(door)            
            door = exports.getDoor({type: "b", x1: 0.5,y1: 3,x2: 1.5, y2:3})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)            
        break;   
        
        case 25:                             
            options.text = "chaos sign"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:4})
            options.points.push({x:0, y:4})

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)            
            door = exports.getDoor({type: "b", x1: 1,y1: 4,x2: 2, y2:4})
            options.doors.push(door)
        break;           

        case 26:                             
            options.text = "brass orbs"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:4, y:0})
            options.points.push({x:4, y:5})
            options.points.push({x:0, y:5})

            door = exports.getDoor({type: "t", x1: 1.5,y1: 0,x2: 2.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 1,x2: 4, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 3,x2: 4, y2:4})
            options.doors.push(door)                        
            door = exports.getDoor({type: "b", x1: 1.5,y1: 5,x2: 2.5, y2:5})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 3,x2: 0, y2:4})
            options.doors.push(door)           
        break;     
        
        case 27:                             
            options.text = "kitchen 1"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:1})
            options.points.push({x:4, y:1})
            options.points.push({x:4, y:3})
            options.points.push({x:3.5, y:3})
            options.points.push({x:3.5, y:4})
            options.points.push({x:0.5, y:4})                                    
            options.points.push({x:0.5, y:3})
            options.points.push({x:0, y:3})            

            door = exports.getDoor({type: "t", x1: 0,y1: 0,x2: 1, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 1,x2: 4, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "b", x1: 1,y1: 4,x2: 2, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)
        break;          
        
        case 28:                             
            options.text = "kitchen 2"
            options.size = "small"            
            options.found = true;
            options.points.push({x:1, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:1})
            options.points.push({x:5, y:1})
            options.points.push({x:5, y:3})
            options.points.push({x:4.5, y:3})
            options.points.push({x:4.5, y:4})
            options.points.push({x:0.5, y:4})                                    
            options.points.push({x:0.5, y:3})
            options.points.push({x:0, y:3})
            options.points.push({x:0, y:1})
            options.points.push({x:1, y:1})                        

            door = exports.getDoor({type: "t", x1: 1.5,y1: 0,x2: 2.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 5,y1: 1.5,x2: 5, y2:2.5})
            options.doors.push(door)
            door = exports.getDoor({type: "b", x1: 2,y1: 4,x2: 3, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1.5,x2: 0, y2:2.5})
            options.doors.push(door)
        break;          
        
        case 29:                             
            options.text = "warp alley"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:1})
            options.points.push({x:2.25, y:1})
            options.points.push({x:2.25, y:4})
            options.points.push({x:2, y:4})
            options.points.push({x:2, y:5})
            options.points.push({x:0, y:5})                        

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "b", x1: 0.5,y1: 5,x2: 1.5, y2:5})
            options.doors.push(door)
        break;
        
        case 30:                             
            options.text = "bins"
            options.size = "small"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:1})
            options.points.push({x:3.25, y:1})
            options.points.push({x:3.25, y:3})
            options.points.push({x:3, y:3})
            options.points.push({x:3, y:5})
            options.points.push({x:0, y:5})                        

            door = exports.getDoor({type: "t", x1: 1.5,y1: 0,x2: 2.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3.25,y1: 1.5,x2: 3.25, y2:2.5})
            options.doors.push(door)            
            door = exports.getDoor({type: "b", x1: 1.5,y1: 5,x2: 2.5, y2:5})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1.5,x2: 0, y2:2.5})
            options.doors.push(door)            
        break;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////CURSED CITY TILES
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        case 31:         
        case 32:                             
            options.text = "small square"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:2})
            options.points.push({x:0, y:2})                        

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 2,y1: 0.5,x2: 2, y2:1.5})
            options.doors.push(door)            
            door = exports.getDoor({type: "b", x1: 0.5,y1: 2,x2: 1.5, y2:2})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 0.5,x2: 0, y2:1.5})
            options.doors.push(door)            
        break;

        case 33:         
        case 34:  
        case 35:                                     
            options.text = "small alley"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:3})
            options.points.push({x:0, y:3})                        

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 2,y1: 1,x2: 2, y2:2})
            options.doors.push(door)            
            door = exports.getDoor({type: "b", x1: 0.5,y1: 3,x2: 1.5, y2:3})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)            
        break;

        case 36:  
        case 37:                                     
            options.text = "small alley 2"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:4})
            options.points.push({x:0, y:4})                        

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 0,x2: 3, y2:1})
            options.doors.push(door)            
            door = exports.getDoor({type: "r", x1: 3,y1: 3,x2: 3, y2:4})
            options.doors.push(door)                        
            door = exports.getDoor({type: "b", x1: 1,y1: 4,x2: 2, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 0,x2: 0, y2:1})
            options.doors.push(door)            
            door = exports.getDoor({type: "l", x1: 0,y1: 3,x2: 0, y2:4})
            options.doors.push(door)             
        break;

        case 38:                                     
            options.text = "long alley"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:4})
            options.points.push({x:0, y:4})                        

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 2,y1: 0,x2: 2, y2:1})
            options.doors.push(door)            
            door = exports.getDoor({type: "r", x1: 2,y1: 3,x2: 2, y2:4})
            options.doors.push(door)                        
            door = exports.getDoor({type: "b", x1: 0.5,y1: 4,x2: 1.5, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 0,x2: 0, y2:1})
            options.doors.push(door)            
            door = exports.getDoor({type: "l", x1: 0,y1: 3,x2: 0, y2:4})
            options.doors.push(door)             
        break;

        case 38:                                     
            options.text = "mid box"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:3})
            options.points.push({x:0, y:3})                        

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 1, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 1,x2: 3, y2:2})
            options.doors.push(door)                                 
            door = exports.getDoor({type: "b", x1: 1,y1: 3,x2: 2, y2:3})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)             
        break;

        case 39:                                     
            options.text = "sun dial"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:1})
            options.points.push({x:3, y:1})
            options.points.push({x:3, y:4})
            options.points.push({x:0, y:4})                                                

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 2,x2: 3, y2:3})
            options.doors.push(door)                                 
            door = exports.getDoor({type: "b", x1: 1,y1: 4,x2: 2, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 2,x2: 0, y2:3})
            options.doors.push(door)             
        break;

        case 40:                                     
            options.text = "store room"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:2})
            options.points.push({x:3, y:2})
            options.points.push({x:3, y:3})
            options.points.push({x:0, y:3})                                                

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 2,x2: 3, y2:3})
            options.doors.push(door)                                 
            door = exports.getDoor({type: "b", x1: 1,y1: 3,x2: 2, y2:3})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)             
        break;        

        case 41:                                     
            options.text = "carpet"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:2})
            options.points.push({x:4, y:2})
            options.points.push({x:4, y:4})
            options.points.push({x:0, y:4})                                                

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 2.5,x2: 4, y2:3.5})
            options.doors.push(door)                                 
            door = exports.getDoor({type: "b", x1: 0.5,y1: 4,x2: 1.5, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "b", x1: 2.5,y1: 4,x2: 3.5, y2:4})
            options.doors.push(door)            
            door = exports.getDoor({type: "l", x1: 0,y1: 0.5,x2: 0, y2:1.5})
            options.doors.push(door)            
            door = exports.getDoor({type: "l", x1: 0,y1: 2.5,x2: 0, y2:3.5})
            options.doors.push(door)             
        break;    

        case 42:                                     
            options.text = "coffins"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:3, y:0})
            options.points.push({x:3, y:1})
            options.points.push({x:4, y:1})
            options.points.push({x:4, y:4})
            options.points.push({x:2, y:4})
            options.points.push({x:2, y:3})
            options.points.push({x:0, y:3})                                                                        

            door = exports.getDoor({type: "t", x1: 1,y1: 0,x2: 2, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 2,x2: 4, y2:3})
            options.doors.push(door)                                 
            door = exports.getDoor({type: "b", x1: 2.5,y1: 4,x2: 3.5, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)           
        break;

        case 43:                                     
            options.text = "throne"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:4, y:0})
            options.points.push({x:4, y:6})
            options.points.push({x:0, y:6})

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "t", x1: 2.5,y1: 0,x2: 3.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 0.5,x2: 4, y2:1.5})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 2.5,x2: 4, y2:3.5})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 4,y1: 4.5,x2: 4, y2:5.5})
            options.doors.push(door)                                                        
            door = exports.getDoor({type: "b", x1: 1.5,y1: 6,x2: 2.5, y2:6})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 0.5,x2: 0, y2:1.5})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 2.5,x2: 0, y2:3.5})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 4.5,x2: 0, y2:5.5})
            options.doors.push(door)       
        break;
        
        case 44:                                     
            options.text = "checkered"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:1, y:0})
            options.points.push({x:1, y:1})
            options.points.push({x:2, y:1})
            options.points.push({x:2, y:2})
            options.points.push({x:3, y:2})
            options.points.push({x:3, y:3})
            options.points.push({x:0, y:3})                                                                        

            door = exports.getDoor({type: "t", x1: 0,y1: 0,x2: 1, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 2,x2: 3, y2:3})
            options.doors.push(door)                                 
            door = exports.getDoor({type: "b", x1: 1,y1: 3,x2: 2, y2:3})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)           
        break;        

        case 45:                                     
            options.text = "pirate"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:1, y:0})
            options.points.push({x:1, y:1})
            options.points.push({x:3, y:1})
            options.points.push({x:3, y:4})
            options.points.push({x:0, y:4})                                                                        

            door = exports.getDoor({type: "t", x1: 0,y1: 0,x2: 1, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 2,x2: 3, y2:3})
            options.doors.push(door)                                 
            door = exports.getDoor({type: "b", x1: 2,y1: 4,x2: 3, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 2,x2: 0, y2:3})
            options.doors.push(door)           
        break;   

        case 46:                                     
            options.text = "small checked"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:1})
            options.points.push({x:3, y:1})
            options.points.push({x:3, y:3})
            options.points.push({x:0, y:3})                                                                                    

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)
            door = exports.getDoor({type: "r", x1: 3,y1: 1.5,x2: 3, y2:2.5})
            options.doors.push(door)                                 
            door = exports.getDoor({type: "b", x1: 1,y1: 3,x2: 2, y2:3})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 1,x2: 0, y2:2})
            options.doors.push(door)           
        break;  

        case 47:                                     
            options.text = "L checked"
            options.size = "large"            
            options.found = true;
            options.points.push({x:0, y:0}) 
            options.points.push({x:2, y:0})
            options.points.push({x:2, y:2})
            options.points.push({x:4, y:2})
            options.points.push({x:4, y:4})
            options.points.push({x:0, y:4})                                                                                    

            door = exports.getDoor({type: "t", x1: 0.5,y1: 0,x2: 1.5, y2:0})
            options.doors.push(door)

            door = exports.getDoor({type: "r", x1: 4,y1: 2.5,x2: 4, y2:3.5})
            options.doors.push(door)                            

            door = exports.getDoor({type: "b", x1: 0.5,y1: 4,x2: 1.5, y2:4})
            options.doors.push(door)
            door = exports.getDoor({type: "b", x1: 2.5,y1: 4,x2: 3.5, y2:4})
            options.doors.push(door)            

            door = exports.getDoor({type: "l", x1: 0,y1: 0.5,x2: 0, y2:1.5})
            options.doors.push(door)
            door = exports.getDoor({type: "l", x1: 0,y1: 2.5,x2: 0, y2:3.5})
            options.doors.push(door)                       
        break; 

    }


    options.points.forEach((point, i) => {

        let size = options.small_tile_size;
        if(options.size === "large"){
            size = options.large_tile_size;
        }

        options.points[i].x *= size
        options.points[i].y *= size
    })

    options.doors.forEach((door, i) => {

        // door.active = false;

        door.points.forEach((point, n) => {

            let size = options.small_tile_size;
            let door_offset = options.small_door_depth_offset;
            if(options.size === "large"){
                size = options.large_tile_size;
                door_offset = options.large_door_depth_offset;
            }

            options.doors[i].points[n].x *= size
            options.doors[i].points[n].y *= size

            //ADJUST THE POSITION DEPENDING ON THE ORIENTATION OF THE DOOR
            if(point.yA){
                options.doors[i].points[n].y += door_offset * point.yA;
            }

            if(point.xA){
                options.doors[i].points[n].x += door_offset * point.xA;
            }                    

        })          
    })

    return options
}

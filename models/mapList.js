
const mongoose = require('mongoose');


const MapList =  mongoose.model('MapList', {
    name:{
        type:String,
        required: true,
        minlength: 1,

    },
    address:{
        type: String,
        required: true
    },
    open: {
        type: String,
        required: true
    },
    timesubmitted:[],
  
    wait:{
        type: String,
        required: true
    },
    coordinates:[{type:Number, required: true}, {type:Number, required: true}]
    

});


module.exports = {MapList}
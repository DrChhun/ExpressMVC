const mongoose = require('mongoose');

const findSchema = new mongoose.Schema({

    name : { 
        type : String,
        required : true 
    },
    age: {
        type: Number
    },
    height: {
        type: Number
    }

});

module.exports = mongoose.model('User', findSchema)
const mongoose = require('mongoose');

const findSchema = new mongoose.Schema({

    name : { 
        type : String,
        unique : true, 
        required : true 
    },
    age: {
        type: Number,
        unique: true
    },
    height: {
        type: Number
    }

});

module.exports = mongoose.model('User', findSchema)
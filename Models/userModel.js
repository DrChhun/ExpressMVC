const mongoose = require('mongoose');

const findSchema = new mongoose.Schema({

    name: {
        type: String
    },
    age: {
        type: String
    },
    height: {
        type: String
    }

});

module.exports = mongoose.model('Find', findSchema)
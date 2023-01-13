const mongoose = require('mongoose')

const URI = 'mongodb+srv://root:085622539@cluster0.22r9fjz.mongodb.net/server'

mongoose.set('strictQuery', true)

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(URI)
        console.log('Connected with Mongo DB')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB;
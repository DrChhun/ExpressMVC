const User = require('../Models/userModel');

module.exports = {
    
    // GET ALL USERS
    getUser : async (req, res) => {
        try {
            const users = await User.find()
            res.status(200).json({
                result: users.length,
                data: {
                    users
                }
            })
        } catch (err) {
            res.status(404).json({
                err: err.message,
                message: "damn you got error? 🫵🏼😂"
            })
        }
    },

    // ADD NEW USER
    postUser : async (req, res) => {

        console.log(req.body);

        try {
            const newUser = await User.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    newUser
                }
            })
        } catch (err) {
            res.status(404).json({
                err: err.message,
                message: "You can't posts data brooo 🫵🏼😂"
            })
        }
    },

    // GET USER BY ID
    findUser : async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            })
        } catch (err) {
            res.status(404).json({
                err: err.message,
                message: "You can't posts data brooo 🫵🏼😂"
            })
        }
    },

    // DELETE USER BY ID
    deleteUser : async (req, res) => {
        try { 
            const kick = req.params.id;
            await User.findByIdAndRemove(kick);
            res.status(200).json({
                status: 'success'
            })

        } catch (err) {
            res.status(404).json({
                err: err.message,
                message: "Sorry you can't delete that 🤕"
            })
        }
    },

    // UPDATE USER BY ID
    updateUser : async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({
                status: 'success',
                message: 'Data Updated!!! ❤️‍🔥'
            })

        } catch (err) {
            res.status(404).json({
                err: err.message,
                message: "Sorry you can't update that 🤕"
            })
        }
    }

}
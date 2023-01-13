const Find = require('../Models/userModel');

module.exports = {
    
    getUser : async (req, res) => {
        try {
            const users = await Find.find()

            res.status(200).json(users )
        } catch (err) {
            res.status(404).json({
                err: err.message,
                message: "damn you got error? 🫵🏼😂"
            })
        }
    },

    postUser : async (req, res) => {

        // console.log(req.body);

        try {

            const newUser = await Find.create(req.body);

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
    }

}
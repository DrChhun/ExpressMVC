module.exports = {
    
    getUser : async (req, res) => {
        try {
            res.status(200).json({
                message: 'this is user Controller',
                name: 'KimChhun',
                age: 18
            })
        } catch (err) {
            res.status(404),json({
                err: err.message,
                message: "damn you got error? 🫵🏼😂"
            })
        }
    }

}
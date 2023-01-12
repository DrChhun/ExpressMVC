module.exports = {

    getContent : async (req, res) => {
        try {
            res.status(200).json({
                message: 'this is home Controller'
            });
        } catch (err) {
            res.status(404).json({
                error: err.message,
                message: 'you enter the wrong route 🫵🏼😂',
            })
        }
    },

    getUser : async (req, res) => {
        try {
            res.status(200).json({
                name: 'KimChhun',
                age: 18,
                weight: 85,
                height: 183
            });
        } catch (err) {
            res.status(404).json({
                error: err.message,
                message: 'you enter the wrong route 🫵🏼😂',
            })
        }
    }
}
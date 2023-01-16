const app = require('./app')
const connectDB = require('./config/database')

connectDB();

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})



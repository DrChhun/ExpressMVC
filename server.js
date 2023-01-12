const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
    process.env.DATABASE_PASSWORD
);

const database = mongoose.connection
database.on('err', (error) => {
    console.log(error)
})

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(con => {
        console.log(con.connections);
        console.log("DB connection successful!");
    });

// const uri = "mongodb+srv://root:085622539@cluster0.sy7vx4k.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log("MongoDB Connected…")
// })
// .catch(err => console.log(err))

console.log(process.env);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
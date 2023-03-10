const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../model/tourModel');

const DB = process.env.DATABASE.replace(
process.env.DATABASE_PASSWORD
);

const database = mongoose.connection
database.on('err', (error) => {
  console.log(error)
});

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

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT DATA TO DATABASE
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data successfully loaded!!!");
    } catch (err) {
        console.log(err)
    }
    process.exit();
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!!!')
    } catch (err) {
        console.log(err)
    }
    process.exit();
};

if(process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);
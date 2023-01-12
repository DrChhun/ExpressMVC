const express = require('express');
const app = express();

const homeRouter = require('./Routes/homeRoute');
const userRouter = require('./Routes/userRoute');

const port = 3000;

app.use('/', (req, res) => {
    res.status(200).json({
        message: 'this is good broder'
    });
});

app.use('/home', homeRouter);

app.use('/user', userRouter);


app.listen(port, () => {
    console.log('test express');
});

module.exports = app;
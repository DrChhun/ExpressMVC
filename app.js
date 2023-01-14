const express = require('express');
const bp = require('body-parser')
const app = express();

const userRouter = require('./Routes/userRoute');

// app.use('/', (req, res) => {
//     res.status(200).json({
//         message: 'this is good broder'
//     })
// });

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/user', userRouter);

module.exports = app;
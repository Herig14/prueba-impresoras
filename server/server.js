require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes/impresora'))

mongoose.connect(process.env.urlBD, { useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err
    console.log("Base de datos online");
})

app.listen(process.env.PORT, () => {
    console.log("escuchando el puerto ", 3000);
})
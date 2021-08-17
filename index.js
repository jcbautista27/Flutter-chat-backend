const express = require('express');
const path = require('path')
require('dotenv').config();

//bd config
const {dbConnection} = require('./database/config');
dbConnection();


//App de express
const app = express();


//Lectura y parseo del body
app.use(express.json());

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require("./sockets/socket");


//ruta publica
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Mis rutas
app.use('/api/login', require('./routes/auth'));


server.listen(process.env.PORT, (err) =>{

    if (err) throw new Error(err);

    console.log('servidor online!!', process.env.PORT);
});
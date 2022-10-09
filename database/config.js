const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        
        await mongoose.connect(process.env.BD_CNN);

        console.log('BD ONLINE');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos- hable con el admin');
    }
};

module.exports = {
    dbConnection
};
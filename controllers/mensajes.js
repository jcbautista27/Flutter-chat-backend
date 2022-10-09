const Mensaje = require('../models/mensaje')

const obtenerChat = async( req, res) => {

    const miId = req.uid;
    const mensajeDe = req.params.de;

    const las30 = await Mensaje.find({
        $or: [{de: miId, para: mensajeDe}, {de: mensajeDe, para: miId}]
    })
    .sort({createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensaje: las30
    });

}

module.exports = {
    obtenerChat
}
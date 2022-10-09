const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //Verificar autenticacion
    if(!valido){return client.disconnect();}
    //Cliente autenticado
    console.log("usuario autenticado");
    usuarioConectado(uid);

    //Ingresar al usuario en una sala particular
    // sala global, client.id, 631e71261cbd5bd88bdac79b

    client.join(uid);

    //escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        //TODO: Grabar mensajes
        await grabarMensaje(payload);
        io.to( payload.para ).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});

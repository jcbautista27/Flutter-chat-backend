/*  

    path: api/login

*/

const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/new', [
    check('nombre',"el nombre es obligatorio").not().isEmpty(),
    check('email',"el email es obliogatorio").isEmail(),
    check('password',"la contraseña es obligatorio").not().isEmpty(),
    validarCampos
],crearUsuario);


router.post('/', [
    check('email', "Ingrese su email").isEmail(),
    check('password', "Ingrese su contraseña").not().isEmpty(),
    validarCampos
], login);


router.get('/renew', validarJWT ,renewToken );

module.exports = router;
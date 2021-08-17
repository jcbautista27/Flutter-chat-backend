const {Schema, model} = require('mongoose');

const UsuarioShema = Schema({
    nombre:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    password:{
        type: String,
        require:true
    },
    online:{
        type: String,
        default:false
    }
});

UsuarioShema.method('toJSON', function(){
    const{ __v, _id, password, online, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Usuario",UsuarioShema);
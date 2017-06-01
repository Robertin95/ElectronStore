const mongoose = require('./configuracion')
const  productoSchema = require('./esquemas').productoSchema


const modelos = {
  Producto   : mongoose.model('producto', productoSchema)
};

module.exports = modelos;

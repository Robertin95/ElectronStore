const mongoose = require('./configuracion'),
Schema = mongoose.Schema;

const schemas = {
  productoSchema : new Schema({
    cBarras     : String,
    nombre      : String,
    descripcion : String,
    cantidad    : Number,
    costo       : Number,
    precio      : Number,
    borrado     : Boolean

  })
};

module.exports = schemas;

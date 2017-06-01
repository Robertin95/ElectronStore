var validate = require("validate.js");

const validaciones = {


  init : ()=>{
    validate.validators.length.tooShort = "^El campo debe contener al menos %{count} caracteres";
    validate.validators.length.tooLong = "^El campo no puede rebasar los %{count} caracteres";

    validate.validators.presence.message = "^No puede dejar el campo en blanco";

    validate.validators.numericality.notValid = "^El campo debe contener un valor numérico";
    validate.validators.numericality.notGreaterThan = "^La cantidad debe ser mayor a %{count}";
    validate.validators.numericality.notLessThan = "^Esta cantidad no puede contener tantos dígitos"


  },
  validarProducto: (obj)=>{
    let res = validate(obj, validaciones.producto);
    let str = '';
    let bnd = false;
    if(res==undefined){

      if(obj.cantidad.toString().length>10){
        str+='<p><strong>Cantidad:</strong></p><p>El número no puede contener tantos digitos</p>';
        bnd = true;
      }
      if(obj.costo.toString().length>10){
        str+='<p><strong>Costo:</strong></p><p>El número no puede contener tantos digitos</p>';
        bnd = true;
      }
      if(obj.precio.toString().length>10){
        str+='<p><strong>Precio:</strong></p><p>El número no puede contener tantos digitos</p>';
        bnd = true;
      }
      if(bnd){
        return {
          isCorrecto : false,
          cadena     : str
        }
      }else{
        return {isCorrecto:true}
      }

    }else{

      if(res.cBarras){
        str+='<p><strong>Código de barras:</strong></p>'
        for (let c in res.cBarras) {
          str+='<p>'+res.cBarras[c]+'</p>';
        }
      }
      if(res.nombre){
        str+='<p><strong>Nombre:</strong></p>'
        for (let c in res.nombre) {
          str+='<p>'+res.nombre[c]+'</p>';
        }
      }
      if(res.descripcion){
        str+='<p><strong>Descripción:</strong></p>'
        for (let c in res.descripcion) {
          str+='<p>'+res.descripcion[c]+'</p>';
        }
      }
      if(res.cantidad){
        str+='<p><strong>Cantidad:</strong></p>'
        for (let c in res.cantidad) {
          str+='<p>'+res.cantidad[c]+'</p>';
        }
      }
      if(res.costo){
        str+='<p><strong>Costo:</strong></p>'
        for (let c in res.costo) {
          str+='<p>'+res.costo[c]+'</p>';
        }
      }
      if(res.precio){
        str+='<p><strong>Precio:</strong></p>'
        for (let c in res.precio) {
          str+='<p>'+res.precio[c]+'</p>';
        }
      }
      return {
        isCorrecto : false,
        cadena     : str
      }

    }

  },
  producto : {
    cBarras : {
      presence : true,
      length: {
        minimum: 5,
        maximum: 20
      }
    },
    nombre  : {
      presence : true,
      length: {
        minimum:  6,
        maximun:  12
      }
    },
    descripcion : {
      presence  : true,
      length: {
        minimum:  4,
        maximun:  15
      }
    },
    cantidad  : {
      presence  : true,
      numericality  : {
        greaterThan: 0,
        lessThan   : 9000000
      }
    },
    costo     : {
      presence  : true,
      numericality  : {
        greaterThan: 0,
        lessThan   : 9000000
      }
    },
    precio    : {
      presence  : true,
      numericality  : {
        greaterThan: 0,
        lessThan   : 9000000
      }
    }
  }
}
module.exports = validaciones;

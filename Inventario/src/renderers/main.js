// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('bootstrap');
var validate = require("validate.js");
const Producto = require('.././js/Producto.js');
const validaciones = require('.././js/validaciones/validaciones').init();
const {ipcRenderer} = require('electron');
var alertify = require('alertifyjs');
ipcRenderer.send('leerProducto');
$( "#ipt-buscador" ).keyup(function() {
  let pr =  $("#ipt-buscador").val().trim();
  ipcRenderer.send('leerProducto', pr);
});
$(document).on('click', '#crearProducto', function () {
  let producto = {
    cBarras : $('#cBarras').val().trim(),
    nombre  : $('#nombre').val().trim(),
    descripcion  : $('#descripcion').val().trim(),
    cantidad  : $('#cantidad').val().trim(),
    costo  : $('#costo').val().trim(),
    precio  : $('#precio').val().trim()

  }
  Producto.crearProducto(producto);
});
$(document).on('click', '#editarProducto', function () {
  let producto = {
    cBarras : $('#cBarras').val().trim(),
    nombre  : $('#nombre').val().trim(),
    descripcion  : $('#descripcion').val().trim(),
    cantidad  : $('#cantidad').val().trim(),
    costo  : $('#costo').val().trim(),
    precio  : $('#precio').val().trim(),
    _id     : $('#identificador').attr('k')
  }
  Producto.guardarEdicion(producto);
});
$(document).on('click', '#cerrarModalProducto', function () {
  $('.crearProducto').removeClass('is-active');
  Producto.limpiarFormularioProducto();
  $('#productoMensaje').empty();
  $('#productoDetalle').empty();

  $('#crearProducto').removeClass('ocultar');
  $('.title-registrar-producto').removeClass('ocultar');

  $('#editarProducto').addClass('ocultar');
  $('.title-editar-producto').addClass('ocultar');
});
$(document).on('click', '#opCrearProducto', function () {
  $('.crearProducto').addClass('is-active');
});
$(document).on('click', '#opEditarProducto', function(){
  $('.indicadorCarga').addClass('is-active');
  $('#productoDetalle').append(
    '<input id="identificador" k="'+$(this).attr("key")+'" hidden>'
  );
  ipcRenderer.send('leerProducto', {_id : $(this).attr("key")});
});
$(document).on('click', '#opBorrarProducto', function(){
  Producto.borrar($(this).attr('key'));

});
///77777777777777777777777777777///////////////////////////////////777777777777777777

ipcRenderer.on('crearProducto', (event, data) => {

  if(data.creado){
    Producto.limpiarFormularioProducto();
    $('.indicadorCarga').removeClass('is-active');
    $('#productoMensaje').append(
      '<div class="alert alert-success" role="alert">Producto creado satisfactoriamente</div>'
    );
    ipcRenderer.send('leerProducto');
  }
});
ipcRenderer.on('leerProducto', (event, data) => {
  if (data.hadId) {
    Producto.editar(data, '.crearProducto', ()=>{
      $('.indicadorCarga').removeClass('is-active');
    });
  }else{
    Producto.imprimirProductos(data, '.contenedor-productos');
  }

});
ipcRenderer.on('editarProducto', (event, data) => {
  if (data.actualizado) {
    $('#productoMensaje').append(
      '<div class="alert alert-success" role="alert">Producto actualizado satisfactoriamente</div>'
    );
    ipcRenderer.send('leerProducto');
    $('.indicadorCarga').removeClass('is-active');

  }

});
ipcRenderer.on('borrarProducto', (event, data) => {
  ipcRenderer.send('leerProducto');
  $('.indicadorCarga').removeClass('is-active');
  alertify.success('Producto borrado exitosamente');

});

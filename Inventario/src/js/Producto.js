//window.$ = window.jQuery = require('jquery');
const {ipcRenderer} = require('electron');
const validaciones = require('./validaciones/validaciones');
var alertify = require('alertifyjs');
class Producto {
  static imprimirProductos(productos, selector){
    $(selector).empty();
    console.log(productos.length);
    if(productos.length < 1){
      console.log(productos.length);
      $(selector).append('hjh');
      return false;
    }
    $.each(productos, (i, producto)=>{
      if(producto.borrado){return true;}

      $(selector).append(
        '<div class="panel panel-default producto">'+
          '<div class="panel-body">'+
            '<div class="columns">'+
              '<div class="column is-4">'+
                '<h4><strong>'+producto.nombre+'</strong> </h4>'+
                '<p>'+producto.descripcion+'</p>'+
                '<p>C. de barras: '+producto.cBarras+'</p>'+
              '</div>'+
              '<div class="column is-4">'+
                '<h4 style="color:white;">-</h4>'+
                '<p>Precio: <span class="badge">$<span>'+producto.precio+'</span></span></p>'+
                '<p>Disponible: <span class="badge">'+producto.cantidad+'</span></p>'+
              '</div>'+
              '<div class="column is-4">'+

                '<p class="producto-cantidad-titulo" style="margin-top:10px;">Cantidad:</p>'+
                '<div class="input-group" style="margin-bottom:8px;">'+
                  '<input type="text" class="form-control" value="1">'+
                  '<span class="input-group-btn">'+
                    '<button class="btn btn-default" type="button" key="'+producto._id+'">Agregar</button>'+
                  '</span>'+
                '</div>'+
                '<button key="'+producto._id+'" class="btn btn-default" id="opEditarProducto"><i class="fa fa-pencil-square-o fa-lg"></i> Editar</button>'+
                '<button key="'+producto._id+'" class="btn btn-default" id="opBorrarProducto"><i class="fa fa-trash fa-lg"></i> Borrar</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'
      );
    });
  }
  static crearProducto(producto){
    $('#productoMensaje').empty();
    let res = validaciones.validarProducto(producto);
    if(res.isCorrecto){
      ipcRenderer.send('crearProducto', producto);
      $('.indicadorCarga').addClass('is-active');
    }else{
      $('.modal-producto').animate({scrollTop: '0px'}, 300);
      $('#productoMensaje').append(
        '<div class="alert alert-danger" role="alert">'+res.cadena+'</div>'
      );
    }

  }
  static editar(producto, modal, callback){
    console.log(producto);
    $('#cBarras').val(producto.cBarras);
    $('#nombre').val(producto.nombre);
    $('#descripcion').val(producto.descripcion);
    $('#cantidad').val(producto.cantidad);
    $('#costo').val(producto.costo);
    $('#precio').val(producto.precio);

    $('#crearProducto').addClass('ocultar');
    $('.title-registrar-producto').addClass('ocultar');

    $('#editarProducto').removeClass('ocultar');
    $('.title-editar-producto').removeClass('ocultar');

    $(modal).addClass('is-active');
    callback();
  }
  static guardarEdicion(producto){
    $('#productoMensaje').empty();
    let res = validaciones.validarProducto(producto);
    if(res.isCorrecto){
      ipcRenderer.send('editarProducto', producto);
      $('.indicadorCarga').addClass('is-active');
    }else{
      $('.modal-producto').animate({scrollTop: '0px'}, 300);
      $('#productoMensaje').append(
        '<div class="alert alert-danger" role="alert">'+res.cadena+'</div>'
      );
    }
  }
  static limpiarFormularioProducto(){
    $('#cBarras').val('')
    $('#nombre').val('')
    $('#descripcion').val('')
    $('#cantidad').val(1)
    $('#costo').val('')
    $('#precio').val('')
  }
  static borrar(_id){
    alertify.confirm('Borrar producto', '¿Desea borrar el producto seleccionado?',
      ()=>{
        console.log(_id);
        ipcRenderer.send('borrarProducto',{_id : _id});
        $('.indicadorCarga').addClass('is-active');
        alertify.success('Borrando producto')
      },
      ()=>{ alertify.error('Acción cancelada')}
    );
  }

}
module.exports = Producto;

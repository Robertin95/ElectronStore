const dProducto = require('.././db/modelos').Producto
class Producto{
  static crear(data, callback){
    let producto = new dProducto({
      cBarras     : data.cBarras,
      nombre      : data.nombre,
      descripcion : data.descripcion,
      cantidad    : data.cantidad,
      precio      : data.precio,
      costo       : data.costo,
      borrado     : false
    });
    producto.save()
    .then(function(doc){
      console.log("producto creado correctamente");
      callback();
    },function(err){
      console.log("error durante la ejecución");
    });

  }
  static leer(data, callback){
    if (!data){
      dProducto.find((err, productos)=>{
        if(err){
          return false;
        }
        callback(productos);
      });
    }else{
      let consulta
      if(data._id){
        consulta = dProducto.findById(data._id).exec();
      }else{

        consulta = dProducto.find({$and:[{$or : [{nombre : new RegExp(data, 'i')},{cBarras : new RegExp(data, 'i')}, {descripcion : new RegExp(data, 'i')}] },{borrado : false} ]}).lean().exec();
      }
      consulta.then((productos)=>{
        callback(productos);

      }).catch((err) => {
        console.log('Hubo un error: '+err);
      });
    }
/*
    */
  }
  static actualizar(data, callback){
    dProducto.findByIdAndUpdate({'_id' : data._id},{
        $set : {
          cBarras : data.cBarras,
          nombre  : data.nombre,
          descripcion : data.descripcion,
          cantidad    : data.cantidad,
          precio  : data.precio,
          costo   : data.costo
        }
      },
      {new : true},
      (error, producto)=>{
        if(error){
          console.log('Hubo un error');

        }
        console.log('Nuevo producto:');
        callback();
      }
    );
  }
  static borrar(data, callback){
    dProducto.findByIdAndUpdate({'_id' : data._id},{
        $set : {
          borrado : true
        }
      },
      {new : true},
      (error, producto)=>{
        if(error){
          console.log('Hubo un error');
          console.log(error);

        }
        callback();
      }
    );
  }
}
 module.exports = Producto;

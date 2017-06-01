const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const {ipcMain}= require('electron');
const Producto = require('./app/js/Producto')
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({kiosk:true})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/views/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});
ipcMain.on('leerProducto', (event, data) => {

  Producto.leer(data,(productos)=>{
    if(!data){
      event.sender.send('leerProducto', JSON.parse(JSON.stringify(productos)));
    }else if(!data._id){
      event.sender.send('leerProducto', JSON.parse(JSON.stringify(productos)));
    }else{
      let resProducto = JSON.parse(JSON.stringify(productos));
      resProducto.hadId = true;
      event.sender.send('leerProducto', resProducto);
    }

  });
});
ipcMain.on('crearProducto', (event, producto) => {
  Producto.crear(producto,()=>{
    event.sender.send('crearProducto',{creado : true});
  });
});
ipcMain.on('editarProducto', (event, producto)=>{
  Producto.actualizar(producto, ()=>{
    event.sender.send('editarProducto',{actualizado:true});
  });
});
ipcMain.on('borrarProducto',(event, data)=>{
  Producto.borrar(data, ()=>{
    event.sender.send('borrarProducto');
  });
});

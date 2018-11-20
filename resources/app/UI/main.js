const {app, BrowserWindow} = require('electron');
const url = require('url') ;
const path = require('path');  

let main_window;

function createWindow() { 
   main_window = new BrowserWindow({width: 1280, height: 700});
   main_window.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   }));
   // main_window.setMenu(null);
}  

app.on('ready', createWindow);

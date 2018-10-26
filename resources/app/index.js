const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path')  

let win  

function createWindow() { 
   win = new BrowserWindow({width: 600, height: 400}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, '/src/index.html'), 
      protocol: 'file:', 
      slashes: true 
   })) 
}  

app.on('ready', createWindow) 
const {app, BrowserWindow, nativeImage} = require('electron') 
const electron = require('electron')
const ipcMain= electron.ipcMain
const url = require('url') 
const path = require('path')

let win

function createWindow() { 
	win = new BrowserWindow({width: 1000,height: 600})
	win.loadURL(url.format ({ 
	  pathname: path.join(__dirname, '/src/index.html'), 
	  protocol: 'file:', 
	  slashes: true 
	})) 
}  


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})
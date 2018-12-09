
const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;

// listen for app to be ready
app.on('ready', function(){
    // create new window
    mainWindow = new BrowserWindow({});

    // load html into this window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol:'file',
        slashes: true
    })); 

    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    })

});


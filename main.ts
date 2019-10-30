import { app, BrowserWindow, screen,Tray, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve, tray,on=true;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');


function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    minWidth:600,
    minHeight:400,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  createTray()
  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
    
  }
  if (serve) {
    win.webContents.openDevTools();
  }
  // Emitted when the window is closed.
 win.on('close', (e) => {
   if(!on){
    win=null;
   }else{
     e.preventDefault()
     win.hide()
   }

  
  // Dereference the window object, usually you would store window
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  //win = null;

});
}
function createTray () {
  if(serve){
    tray = new Tray(path.join(__dirname,"/src/assets/img/PeerShare-ink-logo.ico"));
  }else{
    tray = new Tray(path.join(__dirname,"/assets/img/PeerShare-ink-logo.ico"));
  }
  // On Windows, left click opens the app, right click opens the context menu.
  // On Linux, any click (left or right) opens the context menu.
  tray.on('click', () => win.show())
  // Show the tray context menu, and keep the available commands up to date
  updateTrayMenu()
}

function updateTrayMenu () {
  const contextMenu = Menu.buildFromTemplate(getMenuTemplate())
  tray.setContextMenu(contextMenu)
}

function getMenuTemplate () {
  return [
    {
      label: 'Quitar',
      click: () => deleteApp()
    }
  ]
}
function deleteApp(){
  on=false;
  app.quit();
}
try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
     app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

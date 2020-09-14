const { app , BrowserWindow , globalShortcut, nativeImage  } = require( 'electron' )
const config = require( './config' )

let win = null, contents = null

function createWindow () {

  win = new BrowserWindow( {
    width: config.width,
    height: config.height,
    titleBarStyle: 'hidden',
    icon:'../public/assets/icon.svg',
    webPreferences: {
      nodeIntegration: true
    }
  } )

  win.loadURL( config.url )
  contents = win.webContents

}

function toggleDevTools () {
  contents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register( 'CmdOrCtrl+J' , toggleDevTools )
}

app.whenReady()
.then( createWindow )
.then( createShortcuts )

app.on( 'window-all-closed' , () => {
  if ( process.platform !== 'darwin' ) {
    app.quit()
  }
} )

app.on( 'activate', recreateWindow )

function recreateWindow () {
  if ( BrowserWindow.getAllWindows().length === 0 ) {
    createWindow()
  }
}
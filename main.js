'use strict' //启用严格模式

var electron = require('electron')
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var fs = require('fs')
var path = require('path')
var { ipcMain } = require('electron')
//var discontent = document.getElementById('content')
// var isMac = process.platform === 'darwin'
// var isWindows = process.platform === 'win32'
//tally點檢窗口
let tally = null
let loginWin
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 560,
    height: 810,
    center: false,
    webPreferences: {
      nodeIntegration: true, // 解决在渲染层的其他js文件中出现require无法使用的情况【node的方式引入模块】
      enableRemoteModule: true, //新版的electron由於安全原因默認關閉了remote模塊，需要在主進程——main.js的webPreferences配置enableRemoteModule:true
      //preload: path.join(__dirname, 'login.js'),
    },
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  loginWin = new BrowserWindow({
    width: 340,
    height: 320,
    resizable: false, // 禁止改变主窗口尺寸
    webPreferences: { nodeIntegration: true },
  })
  loginWin.once('ready-to-show', () => {
    loginWin.show()
  })
  loginWin.loadFile('login.html')
  loginWin.setMenu(null) //關閉菜單欄
  loginWin.webContents.openDevTools()
  loginWin.on('closed', () => {
    mainWindow = null
  })
}
require('./src/render/menu.js')

ipcMain.on('window-hide', () => {
  loginWin.hide() //隱藏登錄窗口

  //discontent.style.visibility = 'visible' //首頁内容顯示
})

app.on('ready', createWindow)

/* 在最後一個窗口關閉時退出應用 */
app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

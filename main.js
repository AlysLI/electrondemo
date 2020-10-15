/* 一、electron運行流程
   1.读取package.json的中的入口文件,这里我们是main.js
   2.main.js 主进程中创建渲染进程
   3.读取应用页面的布局和样式
   4.使用IPC在主进程执行任务并获取信息 
   二、node里的fs模块
   1.包括文件目录的创建、删除、查询以及文件的读取和写入*/

var electron = require('electron')
var app = electron.app
var BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain // 跳转主进程,使用IPC在主进程执行任务并获取信息
const fs = require("fs")
var mainWindow = null //主窗口
app.on('ready', () => {
    //創建主窗口
    mainWindow = new BrowserWindow({
        width: 360,
        height: 300,
        resizable: false, // 禁止改变主窗口尺寸
        webPreferences: {
            nodeIntegration: true, // 解决在渲染层的其他js文件中出现require无法使用的情况【node的方式引入模块】   
            enableRemoteModule: true //新版的electron由於安全原因默認關閉了remote模塊，需要在主進程——main.js的webPreferences配置enableRemoteModule:true
        }
    })
    /* //創建菜單 */
    //require('./scripts/js/menu.js')
    //加載本地頁面到應用中
    mainWindow.loadFile('index.html')
    //mainWindow.setMenu(null);                      // 关闭菜单栏
    //mainWindow.webContents.openDevTools(); //F12調試
    //監聽主窗口關閉事件
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

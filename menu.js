'use strict'
const { Menu, dialog, app } = require('electron')
var ftpClient = require('ftp')
var ftp = new ftpClient()

var template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        //點擊關閉窗口事件
        click: () => {
          app.quit()
        },
      },
    ],
  },
  {
    label: 'Connect',
    submenu: [
      {
        //ftp://192.168.200.213/
        label: 'Server#1',
        click: () => {
          const connftp = {
            host: '192.168.200.213',
            port: '21',
            user: 'op',
            password: 'op567765!',
          }
          ftp.connect(connftp)
        },
      },
      {
        //ftp://192.168.200.197/
        label: 'Server#2',
        click: () => {},
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Version',
        click: () => {
          dialog.showMessageBox({
            type: 'none',
            title: 'Version',
            message: '1.0.0',
            buttons: ['ok'],
          })
        },
      },
    ],
  },
]

//Menu属于是主线程下的模块，所以只能在主线程中使用，这个要记清楚。
var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)

'use strict'
const login = document.querySelector('#login')
const { ipcRenderer } = require('electron')
const ftpClient = require('ftp')
const ftp = new ftpClient()
window.login = (e) => {
  e.preventDefault() //阻止默認在原生界面打開瀏覽器行為
  const connftp = {
    host: '192.168.200.213',
    port: '21',
    user: 'op',
    password: 'op567765!',
  }
  ftp.connect(connftp)
  ftp.on('ready', async function () {
    checkForm()
  })
}

login.addEventListener('click', window.login)

function checkForm() {
  var name = document.getElementById('username').value
  var pwd = document.getElementById('password').value
  var caution = document.getElementById('caution')

  if (name == null || name == '' || pwd == null || pwd == '') {
    caution.innerHTML = 'The user name and password cannot be empty'
    return false
  } else {
    if (name == 'op' && pwd == 'op567765!') {
      ipcRenderer.send('window-hide')
      return true
    } else {
      caution.innerHTML = 'Incorrect user name or password'
      return false
    }
  }
}

login.onclick = function (e) {
  window.opener.postMessage('我是子窗口傳遞過來的信息')
}

const ipc = require('electron').ipcRenderer //渲染窗口
//1.點擊按鈕打開新窗口
document.getElementById('target').onclick = function () {
  ipc.send('add')
}

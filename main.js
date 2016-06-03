'use strict';

const electron = require('electron');
// アプリケーションをコントロールするモジュール
const {app} = electron;
// ウィンドウを作成するモジュール
const {BrowserWindow} = electron;
const {Tray} = electron;
const {Menu} = electron;
// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;
// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({
      'width': 800, 
      'height': 600,
      'transparent' : true,
      'frame' : true
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  var appIcon = new Tray('images/icon.png');
  var contextMenu = Menu.buildFromTemplate([
    { label: 'menu1' }
  ])
  appIcon.setToolTip('サンプル');
  appIcon.setContextMenu(contextMenu);
  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});



const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const { dialog } = require('electron');

let mainWindow;
const openFileDialog = () => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt', 'js', 'html', 'json'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      mainWindow.webContents.send('file-opened', filePath);
    }
  }).catch(err => {
    console.log(err);
  });
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.webContents.openDevTools();
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        { label: 'New File', accelerator: 'CmdOrCtrl+N', click() { /* Handle new file creation */ } },
        { label: 'Open File', accelerator: 'CmdOrCtrl+O', click() { openFileDialog(); } },
        { type: 'separator' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click() { /* Handle file saving */ } },
        { label: 'Save As...', accelerator: 'CmdOrCtrl+Shift+S', click() { /* Handle file saving as */ } },
        { type: 'separator' },
        { label: 'Exit', accelerator: 'CmdOrCtrl+Q', click() { app.quit(); } },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('request-file-content', (event, filePath) => {
  const fs = require('fs');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    event.reply('file-content', data);
  });
});

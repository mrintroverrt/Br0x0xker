// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tut.orial/process-model#preload-scripts
const { ipcRenderer } = require('electron');

ipcRenderer.on('file-opened', (event, filePath) => {
  ipcRenderer.send('request-file-content', filePath);
});

ipcRenderer.on('file-content', (event, fileContent) => {
  document.getElementById('file-content').innerText = fileContent;
});

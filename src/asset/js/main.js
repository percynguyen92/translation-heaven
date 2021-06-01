const { ipcRenderer} = require('electron');
const ipc = ipcRenderer;
const $ = require('jquery');

$('#closeBtn').on('click', function () {
    ipc.send('closeApp');
});

$('#maximizeBtn').on('click', function () {
    ipc.send('maximizeApp');
    console.log("max");
});

$('#restoreBtn').on('click', function () {
    ipc.send('restoreApp');
    console.log("max");
});

$('#minimizeBtn').on('click', function () {
    ipc.send('minimizeApp');
});

ipc.on('maximized', (event, message) => {
    console.log(message);
});
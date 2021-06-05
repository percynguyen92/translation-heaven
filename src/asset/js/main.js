const { ipcRenderer, clipboard} = require('electron');
const ipc = ipcRenderer;
const $ = require('jquery');

$('#closeBtn').on('click', function () {
    ipc.send('closeApp');
});

$('#maximizeBtn').on('click', function () {
    ipc.send('maximizeApp');
});

$('#minimizeBtn').on('click', function () {
    ipc.send('minimizeApp');
});

$('.phrase').hover(
    function () {
        $(this).addClass('highlight');
    },
    function () {
        $(this).removeClass('highlight');
    }
);

$('#language-import').click(function () {
    var language_source = clipboard.readText();
    $('#language-one').html(language_source);
});


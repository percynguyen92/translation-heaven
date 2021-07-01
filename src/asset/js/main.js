const { ipcRenderer, clipboard, Main} = require('electron');
window.language_source = '';

ipcRenderer.on('maximized', function (event, data) {
    if(data == 1){
        $(".header__right").addClass("window-maximized");
    } else{
        $(".header__right").removeClass("window-maximized");
    }
});

window.convert_to_charcode = function convert_to_charcode (data){
    var char_code = [];
    for (let i = 0; i < data.length; i++) {
        var e = data.charCodeAt(i);
        char_code[i] = e;
    }
    return char_code;
};

$('#language-import').click(function () {
    language_source = Main_app.convert_to_ptag(clipboard.readText().split('\n'));
    for (let i = 0; i < language_source.length; i++) {
        const row = language_source[i];
        $(row).appendTo('#language-src');
    }
});

var Main_app = {
  options: {
    mainappArea: ".main-app",
  },
  defaultDialogOption: {
    //hidden: true,
    place: "center",
    clsWindow: "th-dialog",
    clsCaption: "th-dialog-caption",
    clsContent: "th-dialog-content",
    draggable: true,
    resizable: false,
    btnMax: false,
    btnMin: false,
  },
  dialogs: {},
  setup: function () {},
  closeApp: function () {
    ipcRenderer.send("closeApp");
  },
  minimizeApp: function () {
    ipcRenderer.send("minimizeApp");
  },
  maximizeApp: function () {
    ipcRenderer.send("maximizeApp");
  },
  convert_to_ptag: function (data) {
    var i = 0;
    var data_ptag = [];
    for (let index = 0; index < data.length; index++) {
      var e = data[index].trim();
      if (e.length != 0) {
        data_ptag[i] = "<p>" + e + "</p>";
        i++;
      }
    }
    return data_ptag;
  },
  create_dialog: function (option) {
    var o = Object.assign(this.defaultDialogOption, option);
    console.log(o);
    var w = $("<div>").appendTo($(this.options.mainappArea));
    var wnd = w.window(o).data("window");
    return wnd;
  },
  open_dialog: function (dialogName) {
    this.dialogs[dialogName] = this.create_dialog({
      width: 700,
      height: 300,
      title: "Nạp từ điển từ file txt QT",
    });
  },
  close_dialog : function (dialogName) {
    //console.log(dialogName);
    this.dialogs[dialogName].close();
  },
  import_txt_from_QT : function () {
    //Chuyển đổi file txt thư viện của Quick Translator sang dạng json

    var el = $('#importfile')
    var file = el.prop('files')[0];
    if(file) {
      //nếu đã chọn file
      //gửi file_path về xử lý
      ipcRenderer.invoke('import_txt', file.path).then( function (result){
        //console.log('asdasd' + result);
      });

      //bật loading text và disable nút Nhập
      var loadingText = $(".window").find(".loading-text");
      var importBtn = $(".window").find("#import-btn");
      if (loadingText.hasClass("d-none")) {
        loadingText.removeClass("d-none");
      }
      if (importBtn.hasClass('disable')){
        importBtn.addClass('disable')
      }
      //console.log(file.path);
    } else {
      //thông báo nếu không chọn file nào
      var toast = Metro.toast.create;
      toast("Chưa chọn file txt nào!!!", null, null, "bg-red fg-white ani-horizontal");
    }
  }
};

Main_app.setup();
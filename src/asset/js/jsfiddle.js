
class EditorGrid {
    constructor(e) {
        this.currentInstance = null,
            this.currentGrid = "grid_1",
            this.labelTimeout = setTimeout(() => {
                this.hideSizeLabel()
            }
                , 2e3),
            this.currentResults,
            this.sizeLabel = this,
            this.editor = e,
            this.templates = {},
            this.config = {},
            this.templates.label = function (e) {
                return `\n        <div class="windowLabelCont">\n          <span class="windowLabel ${e ? "hidden" : ""}">\n            ${I18n.editor.panels.result}\n          </span>\n          <em class="size">0px</em>\n        </div>`
            }
            ,
            this.templates.renderPanel = function () {
                return `\n        <div class="resultsCont">\n          <div class="iframeCont">\n            <iframe name="result"\n              allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;"\n              sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-downloads"\n              allowfullscreen allowpaymentrequest frameBorder="0" src="${EditorConfig.paths.render}">\n            </iframe>\n          </div>\n          ${this.label(EditorConfig.shell)}\n        </div>`
            }
            ,
            this.templates.panelSettings = function (e, t) {
                return `\n        <div class="windowLabelCont">\n          <a href="#" class="windowLabel" data-panel="${e}" data-popover-trigger="${e}">\n            <span class="label">${t}</span>\n            <svg width="8" height="7" viewBox="-0.019531 -52.792969 30.039062 25.195312">\n              <path d="M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000"></path>\n            </svg>\n          </a>\n          <a href="#" class="panelTidy" data-panel="${e}">\n          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-left"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg> ${I18n.editor.panels.tidy}</a>\n        </div>`
            }
            ,
            this.templates.grids = {
                grid_1: `\n        <div class="panel-v left">\n          <div class="panel-h panel">\n            <textarea id="id_code_html" name="code_html"></textarea>\n            ${this.templates.panelSettings("html", "HTML")}\n          </div>\n          <div class="panel-h panel">\n            <textarea id="id_code_js" name="code_js"></textarea>\n            ${this.templates.panelSettings("js", "JavaScript")}\n          </div>\n        </div>\n        <div class="panel-v right">\n          <div class="panel-h panel">\n            <textarea id="id_code_css" name="code_css"></textarea>\n            ${this.templates.panelSettings("css", "CSS")}\n          </div>\n          <div class="panel-h panel resultsPanel">\n            ${this.templates.renderPanel()}\n          </div>\n        </div>`,
                grid_2: `\n        <div class="panel-v panel">\n          <textarea id="id_code_html" name="code_html"></textarea>\n          ${this.templates.panelSettings("html", "HTML")}\n        </div>\n        <div class="panel-v panel">\n          <textarea id="id_code_js" name="code_js"></textarea>\n          ${this.templates.panelSettings("js", "JavaScript")}\n        </div>\n        <div class="panel-v panel">\n          <textarea id="id_code_css" name="code_css"></textarea>\n          ${this.templates.panelSettings("css", "CSS")}\n        </div>\n        <div class="panel-v panel resultsPanel">\n          ${this.templates.renderPanel()}\n        </div>`,
                grid_3: `\n        <div class="panel-h">\n          <div class="panel-v panel">\n            <textarea id="id_code_html" name="code_html"></textarea>\n            ${this.templates.panelSettings("html", "HTML")}\n          </div>\n          <div class="panel-v panel">\n            <textarea id="id_code_js" name="code_js"></textarea>\n            ${this.templates.panelSettings("js", "JavaScript")}\n          </div>\n          <div class="panel-v panel">\n            <textarea id="id_code_css" name="code_css"></textarea>\n            ${this.templates.panelSettings("css", "CSS")}\n          </div>\n        </div>\n        <div class="panel-h panel resultsPanel">\n          ${this.templates.renderPanel()}\n        </div>`,
                grid_4: `\n        <div class="panel-v">\n          <div class="panel-h panel">\n            <textarea id="id_code_html" name="code_html"></textarea>\n            ${this.templates.panelSettings("html", "HTML")}\n          </div>\n          <div class="panel-h panel">\n            <textarea id="id_code_js" name="code_js"></textarea>\n            ${this.templates.panelSettings("js", "JavaScript")}\n          </div>\n          <div class="panel-h panel">\n            <textarea id="id_code_css" name="code_css"></textarea>\n            ${this.templates.panelSettings("css", "CSS")}\n          </div>\n        </div>\n        <div class="panel-v panel resultsPanel">\n          ${this.templates.renderPanel()}\n        </div>`,
                grid_5: `\n        <div id="tabs">\n          <ul>\n            <li class="active tabItem"><a href="" data-lang="html">HTML</a></li>\n            <li class="tabItem"><a href="" data-lang="js">JavaScript</a></li>\n            <li class="tabItem"><a href="" data-lang="css">CSS</a></li>\n            <li class="dragInfo"></li>\n          </ul>\n        </div>\n        <div class="tabsContainer">\n          <div class="panel-v panel">\n            <div class="tabCont panel">\n              <textarea id="id_code_html" name="code_html"></textarea>\n              ${this.templates.panelSettings("html", "HTML")}\n            </div>\n            <div class="tabCont panel hidden">\n              <textarea id="id_code_js" name="code_js"></textarea>\n              ${this.templates.panelSettings("js", "JavaScript")}\n            </div>\n            <div class="tabCont panel hidden">\n              <textarea id="id_code_css" name="code_css"></textarea>\n              ${this.templates.panelSettings("css", "CSS")}\n            </div>\n          </div>\n          <div class="panel-v panel resultsPanel">\n            ${this.templates.renderPanel()}\n          </div>\n        </div>`,
                grid_6: `\n        <div id="tabs" class="tabsH">\n          <ul>\n            <li class="active tabItem"><a href="" data-lang="html">HTML</a></li>\n            <li class="tabItem"><a href="" data-lang="js">JavaScript</a></li>\n            <li class="tabItem"><a href="" data-lang="css">CSS</a></li>\n            <li class="dragInfo" data-label="← ${I18n.editor.panels.drag_to_reorder}"></li>\n          </ul>\n        </div>\n        <div class="tabsContainer tabsH">\n          <div class="panel-h panel">\n            <div class="tabCont panel">\n              <textarea id="id_code_html" name="code_html"></textarea>\n              ${this.templates.panelSettings("html", "HTML")}\n            </div>\n            <div class="tabCont panel hidden">\n              <textarea id="id_code_js" name="code_js"></textarea>\n              ${this.templates.panelSettings("js", "JavaScript")}\n            </div>\n            <div class="tabCont panel hidden">\n              <textarea id="id_code_css" name="code_css"></textarea>\n              ${this.templates.panelSettings("css", "CSS")}\n            </div>\n          </div>\n          <div class="panel-h panel resultsPanel">\n            ${this.templates.renderPanel()}\n          </div>\n        </div>`
            },
            this.config.grid = {
                grid_1: {
                    structure: this.templates.grids.grid_1,
                    init: () => {
                        var e = getSelectors("#editor .panel-v"),
                            t = Split(e, this.setPanelOptions({
                                showSizeLabel: !0
                            }))
                            , n = getSelectors("#editor .panel-v.left .panel-h")
                            , i = Split(n, this.setPanelOptions({
                                direction: "vertical"
                            }))
                            , r = getSelectors("#editor .panel-v.right .panel-h");
                        return [t, i, Split(r, this.setPanelOptions({
                            direction: "vertical"
                        }))]
                    }
                },
                grid_2: {
                    structure: this.templates.grids.grid_2,
                    init: () => {
                        var e = getSelectors("#editor .panel-v");
                        return [Split(e, this.setPanelOptions({
                            showSizeLabel: !0
                        }))]
                    }
                },
                grid_3: {
                    structure: this.templates.grids.grid_3,
                    init: () => {
                        var e = getSelectors("#editor .panel-h")
                            , t = Split(e, this.setPanelOptions({
                                direction: "vertical",
                                showSizeLabel: !0
                            }))
                            , n = getSelectors("#editor .panel-v");
                        return [t, Split(n, this.setPanelOptions())]
                    }
                },
                grid_4: {
                    structure: this.templates.grids.grid_4,
                    init: () => {
                        var e = getSelectors("#editor .panel-v")
                            , t = Split(e, this.setPanelOptions({
                                showSizeLabel: !0
                            }))
                            , n = getSelectors("#editor .panel-h");
                        return [t, Split(n, this.setPanelOptions({
                            direction: "vertical"
                        }))]
                    }
                },
                grid_5: {
                    structure: this.templates.grids.grid_5,
                    init: () => {
                        this.activateTabs();
                        var e = getSelectors("#editor .panel-v");
                        return [Split(e, this.setPanelOptions({
                            showSizeLabel: !0
                        }))]
                    }
                },
                grid_6: {
                    structure: this.templates.grids.grid_6,
                    init: () => {
                        this.activateTabs();
                        var e = getSelectors("#editor .panel-h");
                        return [Split(e, this.setPanelOptions({
                            showSizeLabel: !0,
                            direction: "vertical"
                        }))]
                    }
                }
            }
    }
    hideSizeLabel() {
        this.sizeLabel.classList.add("hidden")
    }
    manageSizeLabel(e, t) {
        var n = Math.round(e.getBoundingClientRect().width);
        t.innerText = `${n}px`,
            t.classList.remove("hidden"),
            this.labelTimeout && clearTimeout(this.labelTimeout),
            this.labelTimeout = setTimeout(() => {
                this.hideSizeLabel()
            }
                , 2e3)
    }
    activateTabs() {
        var e = Array.from(document.querySelectorAll("#tabs a"))
            , t = Array.from(document.querySelectorAll(".tabCont"));
        e.forEach(function (n, i) {
            n.addEventListener("click", function (r) {
                r.stopPropagation(),
                    r.preventDefault(),
                    t.forEach(function (e) {
                        e.classList.add("hidden")
                    }),
                    e.forEach(function (e) {
                        e.parentNode.classList.remove("active")
                    }),
                    t[i].classList.remove("hidden"),
                    n.parentNode.classList.add("active"),
                    Layout.editors[n.dataset.lang].editor.focus()
            })
        });
        var n = {
            draggable: ".tabItem",
            animation: 150,
            store: {
                get: function (e) {
                    var t = localStorage.getItem(e.options.group.name);
                    return t ? t.split("|") : []
                },
                set: function (e) {
                    var t = e.toArray();
                    localStorage.setItem(e.options.group.name, t.join("|"))
                }
            }
        };
        new Sortable(document.querySelector("#tabs ul"), n)
    }
    getElements(e) {
        var t = document.querySelectorAll(e);
        return Array.from(t)
    }
    getSize() {
        for (var e = [], t = 0; t < this.currentInstance.length; t++)
            e.push(this.currentInstance[t].getSizes());
        return e
    }
    setSize() {
        var e = this.currentGrid
            , t = JSON.parse(localStorage.getItem(`${e}-split-sizes`));
        if (t)
            for (var n = 0; n < this.currentInstance.length; n++)
                this.currentInstance[n].setSizes(t[n])
    }
    saveSize() {
        var e = this.currentGrid;
        localStorage.setItem(`${e}-split-sizes`, JSON.stringify(this.getSize()))
    }
    setPanelOptions(e) {
        if (e)
            var t = e.direction;
        var n = {
            direction: t || "horizontal",
            minSize: 100,
            snapOffset: 10,
            gutterSize: 1,
            onDragEnd: () => {
                this.saveSize()
            }
        };
        return e && e.showSizeLabel && (this.currentResults = document.querySelector(".resultsPanel"),
            this.sizeLabel = document.querySelector(".resultsPanel .size"),
            n.onDrag = (() => {
                this.manageSizeLabel(this.currentResults, this.sizeLabel)
            }
            )),
            n
    }
    switchGrid(e) {
        this.currentGrid = e,
            this.config.grid[e] && (this.editor.innerHTML = this.config.grid[e].structure,
                this.currentInstance = this.config.grid[e].init(),
                document.body.classList.add(`gridMode_${e}`),
                this.setSize(),
                new Editor.JS(document.querySelector("#id_code_js"), {
                    language: EditorConfig.panels.js,
                    value: Layout.currentCode.js
                }),
                new Editor.HTML(document.querySelector("#id_code_html"), {
                    language: EditorConfig.panels.html,
                    value: Layout.currentCode.html
                }),
                new Editor.CSS(document.querySelector("#id_code_css"), {
                    language: EditorConfig.panels.css,
                    value: Layout.currentCode.css
                }),
                Actions.switchLanguage(document.querySelector("#panel_js_choice")),
                this.manageSizeLabel(this.currentResults, this.sizeLabel),
                window.ConsoleManager = new Console)
    }
}
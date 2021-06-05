window.getSelectors = function (e) {
    var t;
    return t = document.querySelectorAll(e),
        Array.from(t);
};

var panel_v = getSelectors('.panel-v');
Split(panel_v, {
    sizes: [25, 75],
    minSize: 200,
    gutterSize: 2,
});

var panel_h_r = getSelectors('.panel-v.right .panel-h');
Split(panel_h_r, {
    sizes: [60, 40],
    direction: 'vertical',
    gutterSize: 2,
});
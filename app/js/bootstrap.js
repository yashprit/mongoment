(function () {
    var conService = require('./js/index.js')
    var gui = require('nw.gui');
    var win = gui.Window.get();

    win.on('new-win-policy', function (frame, url, policy) {
        gui.Shell.openExternal(url);
        policy.ignore();
    });

    process.on('uncaughtException', function (err) {
        console.error('error: ', err.red);
        console.info(err.stack);
        window.alert(err);
        return false;
    });
    $("#saveConnection").on("click", function(){
        var ip = $("#ip").val();
        var port = $("#port").val();
        conService(ip, port).then(function(err, result){
            window.alert(result)
        })
    });
})();

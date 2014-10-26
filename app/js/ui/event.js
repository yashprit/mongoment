$(document).ready(function(){
    $("#saveConnection").on("click", function(){
        var ip = $("#ip").val();
        var port = $("#port").val();
        require("./js/index")(ip, port);
    });
});

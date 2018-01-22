// Write your JavaScript code.

$(function () {
    console.log("initialize");
    $("video").hide();
    function start() {
        console.log("starting");
        $("video").removeAttr("loop");
        $("video").attr("src", "/videos/neuer/intro.mp4");
        $("video").show();
        $('video').on('ended', function () {
            this.currentTime = 9;
        });
    }
    function reset() {
        $("video").off('ended');
        $("video").hide();
        console.log("resetting");
    }
    function emotion(e) {
        console.log(e);
        if (e == "sadness") {
            e = "anger";
        }
        if (e == "neutral") {
            e = "hapiness";
        }
        $("video").off('ended');
        $("video").attr("src", "/videos/neuer/" + e + ".mp4");
        $("video").attr("loop", true);
        $("video")[0].load();
    }
    let connection = new signalR.HubConnection('/updater');
    
    connection.on('start', data => {
        start();
    });
    connection.on('reset', data => {
        reset();
    });
    connection.on('emotion', data => {
        emotion(data);
    });

    connection.start();
});
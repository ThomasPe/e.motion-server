// Write your JavaScript code.

$(function () {
    var status = "none";
    console.log("initialize");
    $("video").hide();
    function start() {
        console.log("starting");
        if (status !== "start") {
            $("video").removeAttr("loop");
            $("video").attr("src", "/videos/neuer/intro.mp4");
            $("video").show();
            $('video').on('ended', function () {
                this.currentTime = 9;
            });
            status = "start";
        }
    }
    function reset() {
        if (status !== "none") {
            $("video").off('ended');
            $("video").hide();
            console.log("resetting");
            status = "none";
        }
    }
    function emotion(e) {
        console.log(e);
        // anger, contempt, disgust, fear, happiness, neutral, sadness, surprise
        status = "emotion";
        if (e == "neutral") {
            e = "happiness";
        }
        if (e == "contempt" || e == "disgust" || e == "fear") {
            e = "surprise";
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
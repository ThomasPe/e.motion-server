// Write your JavaScript code.

$(function () {
    console.log("initialize");
    $("video").hide();
    function start() {
        console.log("starting");
        //$("video").attr("src", "/videos/default.mp4");
        $("video").show();
    }
    function reset() {
        $("video").hide();
        console.log("resetting");
    }
    function emotion(e) {
        console.log(e);
        $("video").attr("src", "/videos/" + e + ".mp4");
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
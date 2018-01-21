// Write your JavaScript code.

$(function () {
    console.log("initialize");
    function start() {
        console.log("starting");
        $("body").css("background-image", "url(/images/bg.jpeg)");
    }
    function reset() {
        console.log("resetting");
        $("body").css("background-color", "blue");
    }
    function emotion(e) {
        console.log(e);
        $("body").css("background-color", "green");
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
// Write your JavaScript code.

let connection = new signalR.HubConnection('/updater');

connection.on('send', data => {
    console.log(data);
});

connection.start()
    .then(() => connection.invoke('send', 'Hello'));
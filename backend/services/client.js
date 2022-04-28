var net = require('net');
client = new net.Socket();

client.connect(14001, '127.0.0.1', () => {
    console.log('Connected');
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('close', function() {
    console.log('Connection closed');
});
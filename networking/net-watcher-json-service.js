const fs = require('fs'),
    net = require('net'),
    filename = process.argv[2];

if (!filename) {
    throw Error(`Error: No filename specified`);
}

net.createServer(connection => {
    //Reporting
    console.log('Subscriber connected');
    connection.write(JSON.stringify({type: 'watching', file: filename}) + '\n');

    //Watcher setup
    const watcher = fs.watch(filename, () => connection.write(
        JSON.stringify({type: 'changed', timestamp: Date.now()}) + '\n'
    ));
    //Cleanup
    connection.on('close', () => {
        console.log(`Subscriber disconnected`);
        watcher.cloase();
    });
}).listen(60300, () => console.log(`Listening for subscribers...`));

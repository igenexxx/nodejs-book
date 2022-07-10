const server = require('net').createServer(connection => {
    console.log(`Subscriber connected`);

    //Two message chunks that together make a whole message
    const firstChunk = '{"type":"changed", "timesta';
    const secondChunk = 'mp": 1405694370094}\n';

    //Send the first chunk immediately
    connection.write(firstChunk);

    
})
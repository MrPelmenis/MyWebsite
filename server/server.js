let port = 20067;

var path = require('path');
const fs = require('fs');
let server = require('http').createServer((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');

    if (response.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }

    if (request.url == "/login") {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("ei dirst");
        return;
    }


});

console.log(`Start listening on port ${port}`);
server.listen(port);
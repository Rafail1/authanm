var http = require('http'),
    httpProxy = require('http-proxy');
var proxy = new httpProxy.createProxyServer({
    target: {
        host: '127.0.0.1',
        port: 9015,
    },
    auth: 'raf:raf'
});
var proxyServer = http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
});

proxyServer.listen(8015);
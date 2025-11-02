var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
})
server.listen(3000,function() {
  console.log('Server running at http://0.0.0.0:3000/');
});
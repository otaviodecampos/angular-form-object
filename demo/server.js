var connect = require('connect');
var serveStatic = require('serve-static');
var path = __dirname;
var port = process.env.PORT || 8080;

connect().use('/', serveStatic(path)).listen(port, function() {
    console.log('Web Server running on port ' + port + '...');
});
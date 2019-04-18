
var http = require('http');
var fs = require('fs');
var path = require('path')

var server = http.createServer(function (req, res) {
    if (req.url === "/") {
        fs.readFile("ht.html", "UTF-8", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    } else if (req.url.match("\.css$")) {
        var cssPath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);
    } else if (req.url.match('\.png$')) {
        console.log(req.url);
        var img = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(img);
        res.writeHead(200, { "Content-Type": "image/png" });
        fileStream.pipe(res);
    } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("No-page-found");
    }
})


server.listen(3000);
const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
const port = 1303

const server = http.createServer((req, res) => {
    console.log('request for' + req.url + ' by method ' + req.method)

    if (req.method == 'GET') {
        var fileURL;
        if (req.url == '/') {
            fileURL = "/index.html"
        } else {
            fileURL = req.url
        }

        var filePath = path.resolve('./public' + fileURL)

        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    res.end('<h2> error 404: ' + fileURL + ' does not exist<h2>')
                }
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                fs.createReadStream(filePath).pipe(res)
            })
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            res.end('<h2> error 404: ' + fileURL + ' not a html file<h2>')
        }
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end(`<h2> error 404: ${fileURL} not a supported file.<h2>`)
    }

})

server.listen(port, hostname, () => {
    console.log(`server running at https://${hostname}:${port}`)
})
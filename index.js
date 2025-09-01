const fs = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  console.log(req.url)
  const pathName = req.url
  if (pathName === '/overview') {
    res.end('overview')
  } else if (pathName === '/product') {
    res.end('product')
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    })
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening on port 8000')
})

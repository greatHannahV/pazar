const fs = require('fs')
const http = require('http')
const url = require('url')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)
const server = http.createServer((req, res) => {
  console.log(req.url)
  const pathName = req.url
  if (pathName === '/overview' || pathName === '/') {
    res.end('overview')
  } else if (pathName === '/product') {
    res.end('product')
  } else if (pathName === '/api') {
    const productData = JSON.parse(data)
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    })
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening on port 8000')
})

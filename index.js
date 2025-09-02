const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8',
)
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8',
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true)
  //overview page
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output)
    //product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)
    //api
  } else if (pathname === '/api') {
    const productData = JSON.parse(data)
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
    //not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    })
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening on port 8000')
})

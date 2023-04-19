const fs = require('fs')
const http = require('http')
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001

/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports = http
  .createServer((req, res) => {
    console.log(`Server raised in port ${PORT}`)
    if (req.url === '/api') {
      fs.readFile('./utils/dogsData.json', (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-type': 'text/plain' })
          res.end('json not found')
        } else {
          res.writeHead(200, { 'Content-type': 'application/json' })
          res.end(data)
        }
      })
      return
    }
    if (req.url === '/allDogs') {
      fs.readFile('./utils/allDogs.html', 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-type': 'text/plain' })
          res.end('html not found')
        } else {
          res.writeHead(200, { 'Content-type': 'text/html' })
          res.end(data)
        }
      })
      return
    }
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.end('Route not found')
    return
  })
  .listen(PORT, 'localhost')

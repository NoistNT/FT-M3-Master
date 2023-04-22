const express = require('express')

const server = express()

const publications = []

server.use(express.json())

let id = 0
server.post('/posts', (req, res) => {
  const { author, title, contents } = req.body

  if (!author || !title || !contents) {
    res.status(400).json({
      error:
        'No se recibieron los parámetros necesarios para crear la publicación'
    })
  }

  const newPublication = {
    id: ++id,
    author,
    title,
    contents
  }

  publications.push(newPublication)
  res.status(200).json(publications)
})

server.get('/posts', (req, res) => {
  const { author, title } = req.query

  const publication = publications.filter(
    (p) => p.author === author && p.title === title
  )

  if (!publication.length)
    res.status(400).json({
      error: 'No existe ninguna publicación con dicho título y autor indicado'
    })

  res.status(200).json(publication)
})

server.get('/posts/:author', (req, res) => {
  const { author } = req.params
  const publication = publications.filter((p) => p.author === author)

  if (!publication.length)
    res
      .status(400)
      .json({ error: 'No existe ninguna publicación del autor indicado' })
  res.status(200).json(publication)
})

server.put('/posts/:id', (req, res) => {
  const { id } = req.params
  const { title, contents } = req.body

  if (!title || !contents)
    res.status(400).json({
      error:
        'No se recibieron los parámetros necesarios para modificar la publicación'
    })

  const publication = publications.find((p) => p.id === +id)

  if (!publication) {
    res.status(400).json({
      error:
        'No se recibió el id correcto necesario para modificar la publicación'
    })
  }

  publication.title = title
  publication.contents = contents

  res.status(200).json(publication)
})

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params

  if (!id)
    res
      .status(400)
      .json({ error: 'No se recibió el id de la publicación a eliminar' })

  const index = publications.findIndex((pub) => pub.id === +id)

  if (index === -1)
    res.status(400).json({
      error:
        'No se recibió el id correcto necesario para eliminar la publicación'
    })

  publications.splice(index, 1)

  res.status(200).json({ success: true })
})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server }

import { Edge } from 'edge.js'
import { createServer } from 'node:http'

const edge = Edge.create()
edge.mount(new URL('./views', import.meta.url))

const server = createServer(async (req, res) => {
  const data = { username: 'virk' }
  const html = await edge.render('home', data)

  res.setHeader('content-type', 'text/html')
  res.end(html)
})

server.listen(3000)

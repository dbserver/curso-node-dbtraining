const express = require('express')
const bodyParser =  require('body-parser')
const livroRoutes = require('./livros/livro-routes')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Estou aqui!!!'))

livroRoutes(app)

module.exports = app
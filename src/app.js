const express = require('express')
const bodyParser = require('body-parser')
const consign = require('consign')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Estou aqui!!!'))

consign({ cwd: 'src'})
    .include('livros')
    .into(app)

module.exports = app
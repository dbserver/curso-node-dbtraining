const models = require('../models')
const Livros = models.Livros

class LivrosController {
    buscar(req, res) {
        return Livros
            .findAll({})
            .then(resultado => res.json(resultado))
            .catch(erro => res.status(412))
    }
}

module.exports = new LivrosController()
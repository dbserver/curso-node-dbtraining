const models = require('../models')
const Livros = models.Livros

class LivrosController {
    buscar(req, res){
        Livros
            .findAll({})
            .then(resultado => {res.json(resultado)})
            .catch(erro => res.status(412))
        
        // res.json([{
        //     nome: 'Criando aplicações testáveis com Nodejs',
        //     descricao: 'Descrição do livro',
        //     preco: 100
        // }])
    }
}

module.exports = new LivrosController()
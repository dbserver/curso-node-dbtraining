class LivrosController {
    buscar(req, res){
        res.json([{
            nome: 'Criando aplicações testáveis com Nodejs',
            descricao: 'Descrição do livro',
            preco: 100
        }])
    }
}

module.exports = new LivrosController()
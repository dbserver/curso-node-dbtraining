module.exports = (app) => {

    app.route('/livros')
        .get((req, res) => {
            res.json([{
                nome: 'Criando aplicações testáveis com Nodejs',
                descricao: 'Descrição do livro',
                preco: 100
            }])
        })
}
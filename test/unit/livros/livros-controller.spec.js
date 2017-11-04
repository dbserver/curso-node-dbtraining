const sinon = require('sinon')
const livrosController = require('../../../src/livros/livros-controller')

describe('Controllers: Livros', () => {
    const livrosPadrao = [{
        nome: 'Criando aplicações testáveis com Nodejs',
        descricao: 'Descrição do livro',
        preco: 100
    }]

    describe('buscar() livros', () => {
        it('deve retornar a lista de livros', () => {
            const request = {}
            const response = {
                json: sinon.spy()
            }

            livrosController.buscar(request, response)

            expect(response.json.called).to.be.true
            expect(response.json.calledWith(livrosPadrao)).to.be.true
        });
    });
});
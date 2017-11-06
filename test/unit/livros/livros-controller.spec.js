const sinon = require('sinon')
const livrosController = require('../../../src/livros/livros-controller')
const models= require('../../../src/models')
const Livros = models.Livros

describe('Controllers: Livros', () => {
    const livrosPadrao = [{
        nome: 'Criando aplicações testáveis com Nodejs',
        descricao: 'Descrição do livro',
        preco: 100
    }]

    describe('buscar() livros', () => {
        it('deve retornar a lista de livros', (done) => {
            const request = {}
            const response = {
                json: sinon.spy()
            }

            const livrosStub = sinon.stub(Livros, 'findAll')
            livrosStub.returns(Promise.resolve(livrosPadrao))
            
            livrosController
                .buscar(request, response)
                .then(() => {
                    livrosStub.restore()
        
                    expect(livrosStub.called).to.be.true
                    expect(response.json.called).to.be.true
                    expect(response.json.calledWith(livrosPadrao)).to.be.true

                    done()
                })

        });
    });
});
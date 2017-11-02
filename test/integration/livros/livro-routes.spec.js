describe('Routes: Livros', () => {

    const livroPadrao = {
        nome: 'Criando aplicações testáveis com Nodejs',
        descricao: 'Descrição do livro',
        preco: 100
    }

    describe('GET /livros', () => {
        it('deve retornar uma lista de livros', done => {
            
            request
                .get('/livros')
                .end((err, res)=> {
                    expect(res.body[0]).to.eql(livroPadrao)

                    done(err)
                })
        })
    })
})
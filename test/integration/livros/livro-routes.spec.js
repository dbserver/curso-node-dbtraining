describe('Routes: Livros', () => {
    const Livros = models.Livros
    const livroPadrao = {
        nome: 'Criando aplicações testáveis com Nodejs',
        descricao: 'Descrição do livro'
    }

    beforeEach(done => {
        Livros
            .destroy({ where: {}})
            .then(()=> Livros.create(livroPadrao))
            .then(() => done())
    });

    describe('GET /livros', () => {
        it('deve retornar uma lista de livros', done => {
            
            request
                .get('/livros')
                .end((err, res)=> {
                    const [livro] = res.body
                    
                    expect(res.status).to.eql(200)
                    expect(livro.nome).to.eql(livroPadrao.nome)
                    expect(livro.descricao).to.eql(livroPadrao.descricao)
                    
                    done(err)
                })
        })
    })
})
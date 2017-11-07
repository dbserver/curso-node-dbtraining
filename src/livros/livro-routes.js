const { buscar } = require('./livros-controller')

module.exports = (app) => {

    app.route('/livros')
        .get(buscar)
}
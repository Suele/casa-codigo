const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.json({
            'mensagem' : 'Tudo certo'
        });
    });

    app.get('/livros', (req, res) => {
        const livroDao = new LivroDao(db);

        livroDao.lista()
            .then(livrosSelecionados => {
                res.marko(
                    require('../views/livros/lista/lista.marko'), {
                        livros: livrosSelecionados
                    }
                );
            }).catch('Nenhum livro foi selecionado!');
    });

    app.get('/livros/form', (req, res) => {
        res.marko(
            require(
                '../views/livros/form/form.marko'));
    });

    app.post('/livros', function (req, resp) {

        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', (req, res) => {
        const livroDao = new LivroDao(db);
        
    });
};
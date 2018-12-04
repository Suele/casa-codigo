module.exports = class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');

                    return resolve(resultados);
                }
            );
        });
    }

    adiciona({titulo, preco, descricao}) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                    INSERT INTO livros (
                        titulo,
                        preco,
                        descricao
                    ) values (?,?,?)
                `,
            [
                titulo,
                preco,
                descricao
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível adicionar o livro!');
                }
 
                resolve();
            });
        });
    }
 
};
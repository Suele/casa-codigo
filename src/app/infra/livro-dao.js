module.exports = class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all("SELECT * FROM livros", (erro, resultados) => {
                if (erro) return reject("Não foi possível listar os livros!");

                return resolve(resultados);
            });
        });
    }

    adiciona({ titulo, preco, descricao }) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    INSERT INTO livros (
                        titulo,
                        preco,
                        descricao
                    ) values (?,?,?)
                `,
                [titulo, preco, descricao],
                erro => {
                    if (erro) {
                        return reject("Não foi possível adicionar o livro!");
                    }
                    resolve();
                }
            );
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get("SELECT * FROM livros where id=?", [id], erro => {
                if (erro) {
                    return reject("Não foi possível encontrar o livro.");
                }
                resolve();
            });
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `
                UPDATE livros SET 
                titulo = ?
                preco = ?
                descricao = ?
                WHERE id = ?
                `,
                [livro.titulo, livro.preco, livro.descricao, livro.id],
                erro => {
                    if (erro) {
                        return reject("Não foi possivel atualizar o livro.");
                    }
                    resolve();
                }
            );
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                DELETE 
                FROM livros 
                WHERE id = ?
                `,
                [id]
                ,
                (erro) => {
                    if(erro){
                        return reject('Não foi possivel remover o livro.');
                    }
                    return resolve();
                }
            );
        });
    }
};

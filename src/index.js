import db from './bd.js';
import cors from 'cors'
import express from 'express'
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const app = express();
app.use(cors());
app.use(express.json());



app.get('/produto', async (req, resp) => {
    try {
        let l = await db.tb_produto.findAll({order: [['id_produto', 'desc']]});
        resp.send(l);
    } catch (e) {
        resp.send({ erro: 'Deu erro no GET!' })
    }
}) 


app.post('/produto', async (req, resp) => {
    try {
        let { nome, categoria, precode, precopor, avaliacao, descricao, estoque, imagem } = req.body;

        let consulta = await db.tb_produto.findOne({where: {nm_produto: nome}});
        
        if(consulta != null) {
            resp.send({erro: '😀 Produto já cadastrado!'})
        } else {

            if(nome == "" || categoria == "" || precode <= 0 || precopor <= 0 || avaliacao <= 0 || descricao == "" || estoque < 0 || imagem == "" )
            {
                resp.send({erro: '❌ Campos inválidos!'})
            } else {
                let i = await db.tb_produto.create({ 
                    nm_produto: nome, 
                    ds_categoria: categoria, 
                    vl_preco_de: precode,
                    vl_preco_por: precopor,
                    vl_avaliacao: avaliacao, 
                    ds_produto: descricao,
                    qtd_estoque: estoque,
                    img_produto: imagem,
                    bt_ativo: true,
                    dt_inclusao: new Date()
                })
                resp.send(i)    
            }
        }
    } catch (e) {
        resp.send({ erro: 'Os campos "Preços", "Avaliação" e "Estoque" tem que conter apenas números!' })
    }
}) 


app.put('/produto/:id', async (req, resp) => {
    try {
        let { nome, categoria, precode, precopor, avaliacao, descricao, estoque, imagem } = req.body;
        let { id } = req.params;

        if(nome == "" && nome.length < 2 || categoria == "" && categoria.length < 2 || precode <= 0 || precopor <= 0 || avaliacao <= 0 || descricao == "" && descricao.length < 2 || estoque <= 0 || imagem == "" && imagem.length < 2 ) {
            resp.send({erro: '❌ Campos inválidos!'})
        } else {
                let i = await db.tb_produto.update(
                {
                    nm_produto: nome, 
                    ds_categoria: categoria, 
                    vl_preco_de: precode,
                    vl_preco_por: precopor,
                    vl_avaliacao: avaliacao, 
                    ds_produto: descricao,
                    qtd_estoque: estoque,
                    img_produto: imagem,
                },
                {
                    where: {id_produto: id }
                })
                resp.sendStatus(200);
            }
    } catch (e) {
        resp.send({ erro: 'Deu erro no PUT!' })
    }
}) 


app.delete('/produto/:id', async (req, resp) => {
    try {
        let {id} = req.params;

        let d = await db.tb_produto.destroy({ where: { id_produto: id }})
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: 'Deu erro no Delete!' })
    }
}) 







app.get('/login', async (req, resp) => {
    try {
        let l = await db.tb_login.findAll();
        resp.send(l);
    } catch (e) {
        resp.send({ erro: 'Deu erro no GET!' })
    }
}) 


app.post('/login', async(req, resp) => {
    try {
        let { nome, login, senha, img } = req.body;

        let i = await db.tb_login.create({
            nm_usuario: nome,
            ds_login: login,
            ds_senha: senha,
            img_usuario: img
        })
        resp.send(i);
    } catch(e) {
        resp.send({erro: 'Erro no POST'})
    }
})


app.put('/login/:id', async(req, resp) => {
    try {
        let { nome, login, senha, img } = req.body;
        let { id } = req.params;

        let i = await db.tb_login.update({
            nm_usuario: nome,
            ds_login: login,
            ds_senha: senha,
            img_usuario: img,
        },
        {
            where: {id_usuario: id}
        })
        resp.sendStatus(200);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.delete('/login/:id', async(req, resp) => {
    try {
        let {id} = req.params;

        let d = await db.tb_login.destroy({where: {id_usuario: id}})
        resp.sendStatus(200);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.listen(process.env.PORT,
            x => console.log(`Subiu a Api, respeita! ${process.env.PORT}`))
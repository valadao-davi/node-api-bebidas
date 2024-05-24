import express from "express";

const app = express();

app.use(express.json());

const bebidas = [
    {
        id: 1,
        nome: "Whisky 1.5L",
        preco: 39.99,
        quantidade: 10,
        descricao: "Uma bebida forte americana"
    },
    {
        id: 2,
        nome: "Coca-Cola 600ml",
        preco: 5.50,
        quantidade: 30,
        descricao: "Uma bebida popular não-alcoolica"
    },
    {
        id: 3,
        nome: "Vodka 1L",
        preco: 32.99,
        quantidade: 30,
        descricao: "Uma bebida forte russa"
    },
]

function buscarBebida(id){
    return bebidas.findIndex(bebidas => {
        return bebidas.id === Number(id);
    })
}

app.route("/cardapio")
    .get((req, res)=> {
        res.status(200).json(bebidas)
    })
    .post((req, res)=> {
        bebidas.push(req.body)
        res.status(201).send("Adicionado com sucesso")
    })


app.route("/cardapio/:id")
    .get((req, res)=> {
        const id = buscarBebida(req.params.id)
        res.status(200).json(bebidas[id])
    })

    .put((req, res)=> {
        const id = buscarBebida(req.params.id)
        bebidas[id].nome = req.body.nome
        bebidas[id].descricao = req.body.descricao
        bebidas[id].preco = req.body.preco
        bebidas[id].quantidade = req.body.quantidade
        res.status(200).json(bebidas[id])
    })

    .delete((req, res)=> {
        const id =buscarBebida(req.params.id)
        if(bebidas[id]){
            bebidas.splice(id, 1)
            res.status(200).send("Removido com sucesso");
        }else{
            res.status(200).send("Bebida não encontrada");
        }
    });


export default app;
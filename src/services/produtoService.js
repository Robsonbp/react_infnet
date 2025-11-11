import { buscarProdutos, inserirProduto, excluirProduto, updateProduto } from "../repositories/postRepository";

let produtos = [
    {id: 1, nome: 'Palha Italiana', descricao: 'Palha Italiana'},
    {id: 2, nome: 'Brownie', descricao: 'Brownie'}
];

let nextId = Math.max(0, ...produtos.map(p => p.id)) + 1;

export const getProdutos = async () => {
    const posts = await buscarProdutos()
    return posts
}

export const criarProduto = async ({title, body, userId}) => {
    const response = await inserirProduto({title, body, userId})
    return response;
}

export const atualizarProduto = async ({id, title, body, userId}) => {
    const response = await updateProduto({id, title, body, userId})
    return response
}

export const deletarProduto = (id) => {
    const produtoParaDeletar = produtos.find(produto => produto.id === id);

    if (!produtoParaDeletar) {
        console.log(`Tentativa de excluir produto com id ${id} não encontrado`);
        return false
    }

    const mensagemConfirmacao = `Tem certeza que deseja excluir o item '${produtoParaDeletar.nome}' (ID: ${id})?`;
    if (window.confirm(mensagemConfirmacao)) {
        produtos = produtos.filter(produto => produto.id !== id);
        return true
    }

    return false
}
import { buscarProdutos, inserirProduto, excluirProduto, updateProduto } from "../repositories/postRepository";

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

export const deletarProduto = async (id) => {
    const mensagemConfirmacao = `Tem certeza que deseja excluir o item com o id ${id}?`;
    if (window.confirm(mensagemConfirmacao)) {
        const response = await excluirProduto(id)
        return true
    }

    return false
}
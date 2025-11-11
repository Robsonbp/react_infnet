import { buscarProdutos, inserirProduto, excluirProduto, updateProduto } from "../repositories/postRepository";

export const getProdutos = async () => {
    try {
        const posts = await buscarProdutos()
        return posts
    } catch(erro) {
        throw erro
    }
}

export const criarProduto = async ({title, body, userId}) => {
    try {
        const response = await inserirProduto({title, body, userId})
        return response;
    } catch(erro) {
        throw erro
    }
}

export const atualizarProduto = async ({id, title, body, userId}) => {
    try {
        const response = await updateProduto({id, title, body, userId})
        return response
    } catch(erro) {
        throw erro
    }
}

export const deletarProduto = async (id) => {
    try {
        const mensagemConfirmacao = `Tem certeza que deseja excluir o item com o id ${id}?`;
        if (window.confirm(mensagemConfirmacao)) {
            const response = await excluirProduto(id)
            return true
        }
    return false

    } catch(erro) {
        throw erro
    }
    
}
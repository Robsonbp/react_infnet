let produtos = [
    {id: 1, nome: 'Palha Italiana', descricao: 'Palha Italiana'},
    {id: 2, nome: 'Brownie', descricao: 'Brownie'}
];

let nextId = Math.max(0, ...produtos.map(p => p.id)) + 1;

export const getProdutos = () => produtos

export const criarProduto = ({nome, descricao}) => {
    const novoProduto = {id: nextId++, nome, descricao};
    produtos = [...produtos, novoProduto];
    return novoProduto;
}

export const atualizarProduto = ({id, nome, descricao}) => {
    const produtosAtualizados = produtos.map(produto => 
        produto.id === id ? {...produto, nome, descricao} : produto
    );

    produtos = produtosAtualizados
    return produtos.find(produto => produto.id === id);
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
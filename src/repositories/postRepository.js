export const buscarProdutos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const json = await response.json()
    return json
}

export const inserirProduto = async ({title, body, userId}) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        "body": JSON.stringify({
            "title": title.toString(),
            "body": body.toString(),
            "userId": parseInt(userId.toString()),
        }),
        "headers": {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    .then((response) => response.json())
    .then((json) => console.log(json));
    
    return response
}

export const updateProduto = ({id, nome, descricao}) => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

    return response
}

export const excluirProduto = (id) => {
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
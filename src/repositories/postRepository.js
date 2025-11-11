export const buscarProdutos = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}: falha ao buscar posts.`)
        }
        const json = await response.json();
        return json;
    } catch(erro) {
        throw erro;
    }
}

export const inserirProduto = async ({title, body, userId}) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            "body": JSON.stringify({
                "title": title.toString(),
                "body": body.toString(),
                "userId": parseInt(userId.toString()),
            }),
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const json = await response.json();
        return json;

    } catch(erro) {
        throw erro;
    }
}

export const updateProduto = async ({id, title, body, userId}) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "PUT",
            body: JSON.stringify({
                "id": id,
                "title": title,
                "body": body,
                "userId": userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const json = await response.json();
        return json
    } catch(erro) {
        throw erro;
    }
}

export const excluirProduto = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        return true;
    } catch(erro) {
        throw erro;
    }
        
        
}
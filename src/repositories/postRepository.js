export const buscarProdutos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await response.json();
    return json;
}

export const inserirProduto = async ({title, body, userId}) => {
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
}

export const updateProduto = async ({id, title, body, userId}) => {
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
}

export const excluirProduto = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    });
    const json = await response.json();
    return true;
}
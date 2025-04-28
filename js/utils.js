// Função para realizar requisições AJAX
async function fetchData(url, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
    }
    return response.json();
}
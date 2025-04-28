document.getElementById('produtoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const quantidade = document.getElementById('quantidade').value;
    const estoque_minimo = document.getElementById('estoque_minimo').value;

    try {
        const response = await fetch('../php/cadastrar-material.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, descricao, quantidade, estoque_minimo }),
        });

        const result = await response.json();
        const mensagem = document.getElementById('mensagem');

        if (result.success) {
            mensagem.textContent = result.message;
            mensagem.style.color = 'green';
            document.getElementById('produtoForm').reset();
        } else {
            mensagem.textContent = result.message;
            mensagem.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
    }
});
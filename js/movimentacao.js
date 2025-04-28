document.addEventListener('DOMContentLoaded', async () => {
    const materialSelect = document.getElementById('material');

    // Carregar materiais cadastrados no banco de dados
    try {
        const response = await fetch('../php/listar-materiais.php?minimal=true'); // Adiciona o parâmetro "minimal=true"
        const result = await response.json();

        console.log('Resposta do servidor:', result); // Log para verificar o JSON retornado

        if (result.success && Array.isArray(result.data)) {
            result.data.forEach(material => {
                console.log('Adicionando material:', material); // Log para verificar cada material
                const option = document.createElement('option');
                option.value = material.id; // Use o ID do material
                option.textContent = material.nome; // Exibe o nome do material
                materialSelect.appendChild(option);
            });
        } else {
            console.error('Erro ao carregar materiais:', result.message || 'Dados inválidos');
        }
    } catch (error) {
        console.error('Erro ao carregar materiais:', error);
    }
});

// Registrar movimentação
document.querySelector('#movimentacaoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const material = document.getElementById('material').value;
    const data = document.getElementById('data').value;
    const quantidade = document.getElementById('quantidade').value;

    try {
        const response = await fetch('../php/movimentacao.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo, material, data, quantidade }),
        });

        const result = await response.text();
        document.getElementById('mensagem').textContent = result;
        document.getElementById('movimentacaoForm').reset();
    } catch (error) {
        console.error('Erro ao registrar movimentação:', error);
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const tabelaEstoque = document.querySelector('#tabela-estoque tbody');

    try {
        // Faz a requisição para o backend
        const response = await fetch('../php/listar-materiais.php');
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
            // Itera sobre os materiais e adiciona as linhas na tabela
            result.data.forEach(material => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${material.nome}</td>
                    <td>${material.descricao}</td>
                    <td>${material.quantidade}</td>
                    <td>${material.estoque_minimo}</td>
                `;

                tabelaEstoque.appendChild(row);
            });
        } else {
            console.error('Erro ao carregar materiais:', result.message || 'Dados inválidos');
        }
    } catch (error) {
        console.error('Erro ao carregar materiais:', error);
    }
});
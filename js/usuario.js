document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o recarregamento da página

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Envia os dados para o backend
    fetch('php/usuario.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
    })
        .then((response) => response.text())
        .then((data) => {
            alert(data); // Exibe a mensagem de sucesso ou erro
            document.getElementById('userForm').reset(); // Limpa o formulário
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Erro ao adicionar usuário.');
        });
});
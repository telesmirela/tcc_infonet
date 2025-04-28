document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o recarregamento da página

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Envia os dados para o backend
    fetch('../php/usuario.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
    })
        .then((response) => response.text())
        .then((data) => {
            const messageElement = document.getElementById('message');
            messageElement.textContent = data; // Exibe a mensagem de sucesso ou erro
            messageElement.style.color = 'green'; // Define a cor da mensagem
            document.getElementById('userForm').reset(); // Limpa o formulário
        })
        .catch((error) => {
            const messageElement = document.getElementById('message');
            messageElement.textContent = 'Erro ao adicionar usuário.';
            messageElement.style.color = 'red'; // Define a cor da mensagem
            console.error('Erro:', error);
        });
});
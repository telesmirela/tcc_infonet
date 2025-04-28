document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const messageElement = document.getElementById('loginMessage');

    // Exibe uma mensagem de carregamento
    messageElement.textContent = 'Processando login...';
    messageElement.style.color = 'blue';

    try {
        const response = await fetch('../php/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log('Resposta do servidor:', result); // Log para depuração

        if (result.success) {
            messageElement.textContent = result.message;
            messageElement.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'telainicial.html';
            }, 1000);
        } else {
            messageElement.textContent = result.message;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        messageElement.textContent = 'Erro ao conectar ao servidor. Tente novamente mais tarde.';
        messageElement.style.color = 'red';
    }
});
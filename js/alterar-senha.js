document.querySelector('.change-password').addEventListener('click', function (e) {
    e.preventDefault();

    const email = prompt('Digite o e-mail do usuário:');
    const novaSenha = prompt('Digite a nova senha:');

    fetch('php/alterar-senha.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, novaSenha }),
    })
        .then((response) => response.text())
        .then((data) => {
            alert(data);
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Erro ao alterar a senha.');
        });
});
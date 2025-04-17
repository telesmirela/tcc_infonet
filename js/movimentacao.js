document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const material = document.getElementById('material').value;
    const data = document.getElementById('data').value;
    const quantidade = document.getElementById('quantidade').value;

    fetch('php/movimentacao.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, material, data, quantidade }),
    })
        .then((res) => res.text())
        .then((data) => {
            alert(data);
            document.querySelector('form').reset();
        })
        .catch((err) => console.error(err));
});
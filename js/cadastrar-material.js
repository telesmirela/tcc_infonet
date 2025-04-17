document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const material = document.getElementById('material').value;
    const data = document.getElementById('data').value;

    fetch('php/cadastrar-material.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material, data }),
    })
        .then((res) => res.text())
        .then((data) => {
            alert(data);
            document.querySelector('form').reset();
        })
        .catch((err) => console.error(err));
});
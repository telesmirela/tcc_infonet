document.querySelector('.generate-button').addEventListener('click', function () {
    fetch('php/relatorio.php')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            alert('Relatório gerado com sucesso!');
        })
        .catch((err) => console.error(err));
});
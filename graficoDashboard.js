// Gráfico de Entradas e Saídas
const ctxEntradasSaidas = document.getElementById('chartEntradasSaidas').getContext('2d');
const chartEntradasSaidas = new Chart(ctxEntradasSaidas, {
    type: 'line', // Tipo de gráfico
    data: {
        labels: ['14/08', '16/08', '18/08', '20/08', '22/08', '24/08'], // Datas
        datasets: [
            {
                label: 'Entradas',
                data: [5, 10, 15, 20, 25, 30], // Dados de entradas
                borderColor: '#2563EB', // Cor da linha
                backgroundColor: 'rgba(37, 99, 235, 0.2)', // Cor de fundo
                fill: true,
            },
            {
                label: 'Saídas',
                data: [3, 8, 12, 18, 22, 28], // Dados de saídas
                borderColor: '#DC2626', // Cor da linha
                backgroundColor: 'rgba(220, 38, 38, 0.2)', // Cor de fundo
                fill: true,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    },
});

// Gráfico de Atividades no Sistema
const ctxAtividades = document.getElementById('chartAtividades').getContext('2d');
const chartAtividades = new Chart(ctxAtividades, {
    type: 'bar', // Tipo de gráfico
    data: {
        labels: ['14/08', '16/08', '18/08', '20/08', '22/08', '24/08'], // Datas
        datasets: [
            {
                label: 'Atividades no Sistema',
                data: [10, 20, 15, 25, 30, 40], // Dados de atividades
                backgroundColor: '#FBBF24', // Cor das barras
                borderColor: '#F59E0B', // Cor da borda
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    },
});
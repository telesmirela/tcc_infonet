async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados de ${endpoint}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, error);
        return null;
    }
}

function createChart(ctx, type, labels, datasets, xTitle, yTitle) {
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xTitle,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: yTitle,
                    },
                },
            },
        },
    });
}

async function initCharts() {
    const entradasSaidasData = await fetchData('../php/entradasSaidas.php');
    if (entradasSaidasData) {
        const ctxEntradasSaidas = document.getElementById('chartEntradasSaidas').getContext('2d');
        createChart(ctxEntradasSaidas, 'line', entradasSaidasData.labels, [
            {
                label: 'Entradas',
                data: entradasSaidasData.entradas,
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                fill: true,
            },
            {
                label: 'Saídas',
                data: entradasSaidasData.saidas,
                borderColor: '#DC2626',
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                fill: true,
            },
        ], 'Data', 'Quantidade');
    }

    const atividadesData = await fetchData('../php/atividades.php');
    if (atividadesData) {
        const ctxAtividades = document.getElementById('chartAtividades').getContext('2d');
        createChart(ctxAtividades, 'bar', atividadesData.labels, [
            {
                label: 'Atividades no Sistema',
                data: atividadesData.atividades,
                backgroundColor: '#FBBF24',
                borderColor: '#F59E0B',
                borderWidth: 1,
            },
        ], 'Data', 'Quantidade de Atividades');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const ctxEntradasSaidas = document.getElementById('chartEntradasSaidas').getContext('2d');

    try {
        // Faz a requisição para o backend
        const response = await fetch('../php/entradasSaidas.php');
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Dados do gráfico Entradas e Saídas:', result); // Log para depuração

        if (result.labels && result.entradas && result.saidas) {
            // Cria o gráfico de Entradas e Saídas
            new Chart(ctxEntradasSaidas, {
                type: 'line',
                data: {
                    labels: result.labels,
                    datasets: [
                        {
                            label: 'Entradas',
                            data: result.entradas,
                            borderColor: 'green',
                            backgroundColor: 'rgba(0, 128, 0, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'Saídas',
                            data: result.saidas,
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
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
        } else {
            console.error('Erro ao carregar dados do gráfico Entradas e Saídas:', result.message || 'Dados inválidos');
        }
    } catch (error) {
        console.error('Erro ao carregar dados do gráfico Entradas e Saídas:', error);
    }
});

initCharts();
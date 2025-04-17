// Função para buscar dados do backend
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

// Inicializar gráficos
async function initCharts() {
    // Buscar dados para o gráfico de Entradas e Saídas
    const entradasSaidasData = await fetchData('../php/entradasSaidas.php');
    if (entradasSaidasData) {
        console.log('Dados de Entradas e Saídas:', entradasSaidasData); // Depuração
        const ctxEntradasSaidas = document.getElementById('chartEntradasSaidas').getContext('2d');
        new Chart(ctxEntradasSaidas, {
            type: 'line',
            data: {
                labels: entradasSaidasData.labels,
                datasets: [
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
        console.error('Não foi possível carregar os dados de Entradas e Saídas.');
    }

    // Buscar dados para o gráfico de Atividades no Sistema
    const atividadesData = await fetchData('../php/atividades.php');
    if (atividadesData) {
        console.log('Dados de Atividades no Sistema:', atividadesData); // Depuração
        const ctxAtividades = document.getElementById('chartAtividades').getContext('2d');
        new Chart(ctxAtividades, {
            type: 'bar',
            data: {
                labels: atividadesData.labels,
                datasets: [
                    {
                        label: 'Atividades no Sistema',
                        data: atividadesData.atividades,
                        backgroundColor: '#FBBF24',
                        borderColor: '#F59E0B',
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
    } else {
        console.error('Não foi possível carregar os dados de Atividades no Sistema.');
    }
}

// Inicializar os gráficos ao carregar a página
initCharts();
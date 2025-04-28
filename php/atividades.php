<?php
header('Content-Type: application/json');
include 'db.php';

// Obter a data de 10 dias atrás
$dataInicio = date('Y-m-d', strtotime('-10 days'));
$dataFim = date('Y-m-d');

// Consultar o número de atividades (entradas e saídas) por dia
$stmt = $pdo->prepare("
    SELECT 
        DATE(data_movimentacao) AS data,
        COUNT(*) AS atividades
    FROM movimentacoes
    WHERE data_movimentacao BETWEEN ? AND ?
    GROUP BY DATE(data_movimentacao)
    ORDER BY DATE(data_movimentacao) ASC
");
$stmt->execute([$dataInicio, $dataFim]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Preparar os dados para o gráfico
$data = array_reduce($result, function ($carry, $row) {
    $carry['labels'][] = $row['data'];
    $carry['atividades'][] = (int)$row['atividades'];
    return $carry;
}, ['labels' => [], 'atividades' => []]);

echo json_encode($data);
?>
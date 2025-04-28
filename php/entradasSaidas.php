<?php
header('Content-Type: application/json');
include 'db.php';

try {
    // Obter a data de 10 dias atrás
    $dataInicio = date('Y-m-d', strtotime('-10 days'));
    $dataFim = date('Y-m-d');

    // Consultar movimentações de entrada e saída no banco de dados
    $stmt = $pdo->prepare("
        SELECT 
            DATE(data_movimentacao) AS data,
            SUM(CASE WHEN tipo = 'entrada' THEN quantidade ELSE 0 END) AS entradas,
            SUM(CASE WHEN tipo = 'saida' THEN quantidade ELSE 0 END) AS saidas
        FROM movimentacoes
        WHERE data_movimentacao BETWEEN ? AND ?
        GROUP BY DATE(data_movimentacao)
        ORDER BY DATE(data_movimentacao) ASC
    ");
    $stmt->execute([$dataInicio, $dataFim]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Preparar os dados para o gráfico
    $labels = [];
    $entradas = [];
    $saidas = [];

    foreach ($result as $row) {
        $labels[] = $row['data'];
        $entradas[] = (int)$row['entradas'];
        $saidas[] = (int)$row['saidas'];
    }

    echo json_encode([
        'labels' => $labels,
        'entradas' => $entradas,
        'saidas' => $saidas,
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erro: " . $e->getMessage()]);
}
?>
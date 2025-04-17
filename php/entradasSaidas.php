<?php
header('Content-Type: application/json');

// Simulação de dados do banco de dados
$data = [
    'labels' => ['14/08', '16/08', '18/08', '20/08', '22/08', '24/08'],
    'entradas' => [5, 10, 15, 20, 25, 30],
    'saidas' => [3, 8, 12, 18, 22, 28],
];

echo json_encode($data);
?>
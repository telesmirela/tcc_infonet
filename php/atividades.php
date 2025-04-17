<?php
header('Content-Type: application/json');

// Simulação de dados do banco de dados
$data = [
    'labels' => ['14/08', '16/08', '18/08', '20/08', '22/08', '24/08'],
    'atividades' => [10, 20, 15, 25, 30, 40],
];

echo json_encode($data);
?>
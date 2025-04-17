<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$tipo = $data['tipo'];
$material = $data['material'];
$dataMovimentacao = $data['data'];
$quantidade = $data['quantidade'];

$stmt = $pdo->prepare("INSERT INTO movimentacoes (tipo, material, data_movimentacao, quantidade) VALUES (?, ?, ?, ?)");
$stmt->execute([$tipo, $material, $dataMovimentacao, $quantidade]);

echo ucfirst($tipo) . " registrada com sucesso!";
?>
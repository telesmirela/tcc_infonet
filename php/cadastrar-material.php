<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$material = $data['material'];
$dataEntrada = $data['data'];

$stmt = $pdo->prepare("INSERT INTO materiais (material, data_entrada) VALUES (?, ?)");
$stmt->execute([$material, $dataEntrada]);

echo "Material cadastrado com sucesso!";
?>
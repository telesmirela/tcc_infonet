<?php
include 'db.php';

$stmt = $pdo->query("SELECT * FROM movimentacoes");
$movimentacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($movimentacoes);
?>
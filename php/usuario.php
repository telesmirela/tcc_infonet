<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$nome = $data['nome'];
$email = $data['email'];
$senha = password_hash($data['senha'], PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
$stmt->execute([$nome, $email, $senha]);

echo "Usuário adicionado com sucesso!";
?>
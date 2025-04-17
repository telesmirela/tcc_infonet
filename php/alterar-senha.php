<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$novaSenha = password_hash($data['novaSenha'], PASSWORD_DEFAULT);

$stmt = $pdo->prepare("UPDATE usuarios SET senha = ? WHERE email = ?");
$stmt->execute([$novaSenha, $email]);

echo "Senha alterada com sucesso!";
?>
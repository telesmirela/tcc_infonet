<?php
session_start();
header('Content-Type: application/json');
require 'db.php'; // Inclui a conexão com o banco de dados

// Lê os dados enviados pelo JavaScript
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$senha = $data['senha'] ?? '';

try {
    // Consulta o banco de dados para verificar o login
    $sql = "SELECT * FROM usuarios WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':email' => $email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($senha, $usuario['senha'])) {
        // Armazena informações do usuário na sessão
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nome'] = $usuario['nome'];
        $_SESSION['usuario_tipo'] = $usuario['tipo'];

        echo json_encode(['success' => true, 'message' => 'Login realizado com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'E-mail ou senha inválidos.']);
    }
} catch (Exception $e) {
    // Retorna um JSON válido em caso de erro
    echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>
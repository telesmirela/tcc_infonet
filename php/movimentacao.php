<?php
include 'db.php';
session_start(); // Inicia a sessão para acessar o usuário logado

$data = json_decode(file_get_contents('php://input'), true);
$tipo = $data['tipo'];
$materialId = $data['material'];
$dataMovimentacao = $data['data'];
$quantidade = $data['quantidade'];

// Obtém o ID do usuário logado
$usuarioId = $_SESSION['usuario_id'] ?? null;

if (!$usuarioId) {
    echo "Erro: Usuário não autenticado.";
    exit;
}

try {
    // Verificar se o material existe
    $stmt = $pdo->prepare("SELECT quantidade FROM materiais WHERE id = ?");
    $stmt->execute([$materialId]);
    $material = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$material) {
        echo "Erro: Material não encontrado.";
        exit;
    }

    // Atualizar a quantidade do material
    $novaQuantidade = $tipo === 'entrada' 
        ? $material['quantidade'] + $quantidade 
        : $material['quantidade'] - $quantidade;

    if ($novaQuantidade < 0) {
        echo "Erro: Quantidade insuficiente para saída.";
        exit;
    }

    $stmt = $pdo->prepare("UPDATE materiais SET quantidade = ? WHERE id = ?");
    $stmt->execute([$novaQuantidade, $materialId]);

    // Registrar a movimentação
    $stmt = $pdo->prepare("INSERT INTO movimentacoes (tipo, material_id, usuario_id, data_movimentacao, quantidade) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$tipo, $materialId, $usuarioId, $dataMovimentacao, $quantidade]);

    echo ucfirst($tipo) . " registrada com sucesso!";
} catch (Exception $e) {
    echo "Erro ao registrar movimentação: " . $e->getMessage();
}
?>
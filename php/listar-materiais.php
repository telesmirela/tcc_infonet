<?php
header('Content-Type: application/json');
include 'db.php'; // Inclui a conexão com o banco de dados

try {
    // Verifica se o parâmetro "minimal" foi enviado
    $minimal = isset($_GET['minimal']) && $_GET['minimal'] === 'true';

    // Consulta para buscar os materiais
    if ($minimal) {
        $sql = "SELECT id, nome FROM materiais"; // Apenas ID e Nome
    } else {
        $sql = "SELECT id, nome, descricao, quantidade, estoque_minimo FROM materiais"; // Todos os campos
    }

    $stmt = $pdo->query($sql);

    // Obtém os resultados
    $materiais = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna os materiais como JSON
    echo json_encode(["success" => true, "data" => $materiais]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erro: " . $e->getMessage()]);
}
?>
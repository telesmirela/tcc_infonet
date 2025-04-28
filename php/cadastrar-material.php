<?php
header('Content-Type: application/json');
include 'db.php'; // Inclui a conexão com o banco de dados

try {
    // Recebe os dados do formulário (JSON)
    $data = json_decode(file_get_contents('php://input'), true);

    $nome = $data['nome'];
    $descricao = $data['descricao'];
    $quantidade = $data['quantidade'];
    $estoque_minimo = $data['estoque_minimo'];

    // Insere os dados no banco
    $sql = "INSERT INTO materiais (nome, descricao, quantidade, estoque_minimo) VALUES (:nome, :descricao, :quantidade, :estoque_minimo)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':quantidade', $quantidade, PDO::PARAM_INT);
    $stmt->bindParam(':estoque_minimo', $estoque_minimo, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Material cadastrado com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao cadastrar material."]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erro: " . $e->getMessage()]);
}
?>
<?php
$host = 'localhost';
$dbname = 'controle_estoque'; // Certifique-se de que o nome do banco de dados está correto
$user = 'root'; // Usuário padrão do XAMPP
$password = ''; // Senha padrão do XAMPP (geralmente vazia)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>
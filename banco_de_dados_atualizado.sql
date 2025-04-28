-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS controle_estoque;
USE controle_estoque;

-- Tabela: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador', 'operador') NOT NULL DEFAULT 'operador',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados de teste na tabela "usuarios"
-- Senha: admin
-- Senha: operador
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Admin', 'admin@controleestoque.com', '$2y$10$eImiTXuWVxfM37uY4JANjQe5z9G8p2k6FhF2FQ9J8Z4E6Q2J8Q2', 'administrador'), -- Senha: admin
('Operador', 'operador@controleestoque.com', '$2y$10$eImiTXuWVxfM37uY4JANjQe5z9G8p2k6FhF2FQ9J8Z4E6Q2J8Q2', 'operador'); -- Senha: operador

-- Tabela: categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados de teste na tabela "categorias"
INSERT INTO categorias (nome) VALUES
('Papelaria'),
('Eletrônicos'),
('Limpeza');

-- Tabela: materiais
CREATE TABLE IF NOT EXISTS materiais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    quantidade INT NOT NULL,
    estoque_minimo INT NOT NULL,
    categoria_id INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Inserção de dados de teste na tabela "materiais"
INSERT INTO materiais (nome, descricao, quantidade, estoque_minimo, categoria_id) VALUES
('Caderno', 'Caderno universitário 100 folhas', 50, 10, 1),
('Lápis', 'Lápis preto HB', 100, 20, 1),
('Caneta', 'Caneta azul esferográfica', 200, 30, 1),
('Borracha', 'Borracha branca pequena', 0, 5, 1),
('Monitor', 'Monitor LED 24 polegadas', 10, 2, 2),
('Detergente', 'Detergente líquido 500ml', 30, 10, 3);

-- Tabela: movimentacoes
CREATE TABLE IF NOT EXISTS movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('entrada', 'saida') NOT NULL,
    material_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data_movimentacao DATE NOT NULL,
    quantidade INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (material_id) REFERENCES materiais(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserção de dados de teste na tabela "movimentacoes"
INSERT INTO movimentacoes (tipo, material_id, usuario_id, data_movimentacao, quantidade) VALUES
('entrada', 1, 1, '2025-04-08', 10), -- Entrada de 10 Cadernos
('entrada', 2, 1, '2025-04-09', 20), -- Entrada de 20 Lápis
('entrada', 3, 2, '2025-04-10', 30), -- Entrada de 30 Canetas
('entrada', 1, 2, '2025-04-11', 15), -- Entrada de 15 Cadernos
('saida', 1, 1, '2025-04-09', 5),    -- Saída de 5 Cadernos
('saida', 2, 2, '2025-04-10', 10),   -- Saída de 10 Lápis
('saida', 3, 1, '2025-04-11', 20),   -- Saída de 20 Canetas
('saida', 1, 2, '2025-04-12', 8);    -- Saída de 8 Cadernos

-- Tabela: logs
CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    acao TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserção de dados de teste na tabela "logs"
INSERT INTO logs (usuario_id, acao) VALUES
(1, 'Cadastrou novo material: Caderno'),
(2, 'Realizou movimentação: Entrada de 10 unidades de Caderno'),
(1, 'Atualizou estoque do material: Lápis');
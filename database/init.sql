CREATE DATABASE IF NOT EXISTS todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE todo_db;

CREATE TABLE IF NOT EXISTS todos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Testni podatki, deluje
INSERT INTO todos (title, description, completed) VALUES
('Prva naloga', 'To je moja prva testna naloga', false),
('Druga naloga', 'To je druga testna naloga', true),
('Nakup hrane', 'Mleko, kruh, jajca', false);

SELECT 'Database initialized successfully' as status;
SELECT COUNT(*) as total_todos FROM todos;
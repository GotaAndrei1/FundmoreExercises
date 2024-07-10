CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email)
VALUES
('a', 'a@gmail.com'),
('b', 'b@gmail.com'),
('c', 'c@gmail.com');

UPDATE users
SET email = 'andrei@gmail.com'
WHERE name = 'a';

DELETE FROM users
WHERE name = 'b';

SELECT * FROM users;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (user_id, product_name, order_date)
VALUES
(2, 'p1', '2024-03-14'),
(1, 'p2', '2024-10-10'),
(1, 'p3', '2024-02-20');

SELECT users.id AS user_id, users.name, users.email, orders.id AS order_id, orders.product_name, orders.order_date
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

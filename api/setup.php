<?php
require __DIR__ . '/db.php';

$db = new mysqli('localhost', 'root', '', 'bike_world');

if ($db->connect_error) {
    $db = new mysqli('localhost', 'root', '');
    if ($db->connect_error) {
        echo json_encode(['success' => false, 'error' => 'MySQL connection failed: ' . $db->connect_error]);
        exit;
    }

    $db->query("CREATE DATABASE IF NOT EXISTS bike_world CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $db->select_db('bike_world');
}

$sql = [];
$sql[] = "CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$sql[] = "CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    quantity INT DEFAULT 0,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$sql[] = "CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    shipping_address TEXT,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)";

$sql[] = "CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)";

foreach ($sql as $statement) {
    if (!$db->query($statement)) {
        echo json_encode(['success' => false, 'error' => 'Table creation failed: ' . $db->error]);
        exit;
    }
}

$adminEmail = 'admin@bikeworld.pk';
$adminPassword = 'admin123';
$adminHash = password_hash($adminPassword, PASSWORD_BCRYPT);

$result = $db->query("SELECT id FROM users WHERE email = '$adminEmail'");
if ($result->num_rows === 0) {
    $adminStmt = $db->prepare("INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, 'admin')");
    $adminName = 'Admin';
    $adminPhone = '03001234567';
    $adminAddress = 'Karachi';
    $adminStmt->bind_param('sssss', $adminName, $adminEmail, $adminHash, $adminPhone, $adminAddress);
    $adminStmt->execute();
}

$productCheck = $db->query("SELECT id FROM products LIMIT 1");
if ($productCheck->num_rows === 0) {
    $sampleProducts = [
        ['Premium Engine Oil', 'High-quality synthetic engine oil for motorcycle engines.', 2500, 'Engine Oil', 25, 'uploads/engine-oil.jpg'],
        ['Brake Pads Set', 'Original quality brake pads for everyday riding and safety.', 3200, 'Brakes', 18, 'uploads/brake-pads.jpg'],
        ['Air Filter', 'Reusable air filter for clean engine airflow and better performance.', 1800, 'Filters', 35, 'uploads/air-filter.jpg'],
        ['Chain & Sprocket Kit', 'Durable chain and sprocket kit for smooth transmission.', 5500, 'Drivetrain', 12, 'uploads/chain-kit.jpg'],
        ['Spark Plug', 'Long-lasting spark plug for engine reliability and ignition efficiency.', 800, 'Ignition', 50, 'uploads/spark-plug.jpg'],
        ['Motorcycle Battery', '12V battery suitable for everyday motorcycle usage.', 4200, 'Electrical', 15, 'uploads/battery.jpg']
    ];

    $insert = $db->prepare("INSERT INTO products (name, description, price, category, quantity, image) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($sampleProducts as $product) {
        $insert->bind_param('ssdisi', $product[0], $product[1], $product[2], $product[3], $product[4], $product[5]);
        $insert->execute();
    }
}

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'Database and sample data are ready.',
    'admin_email' => $adminEmail,
    'admin_password' => $adminPassword
]);
?>
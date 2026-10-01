<?php
require __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = $_GET['action'] ?? 'get_all';

    if ($action === 'get_all') {
        $sql = "SELECT * FROM products ORDER BY id DESC";
        $result = $conn->query($sql);

        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }

        echo json_encode(['success' => true, 'products' => $products]);
        exit;
    }

    if ($action === 'get_by_id') {
        $id = (int) ($_GET['id'] ?? 0);

        $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            echo json_encode(['success' => false, 'error' => 'Product not found.']);
            exit;
        }

        echo json_encode(['success' => true, 'product' => $result->fetch_assoc()]);
        exit;
    }
}

if ($method === 'POST') {
    $action = $_GET['action'] ?? '';

    if ($action === 'add') {
        if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
            echo json_encode(['success' => false, 'error' => 'Admin access required.']);
            exit;
        }

        $name = trim($_POST['name'] ?? '');
        $description = trim($_POST['description'] ?? '');
        $price = (float) ($_POST['price'] ?? 0);
        $category = trim($_POST['category'] ?? '');
        $quantity = (int) ($_POST['quantity'] ?? 0);

        $image = '';
        if (!empty($_FILES['image']['name'])) {
            $targetDir = __DIR__ . '/../uploads/';
            if (!is_dir($targetDir)) {
                mkdir($targetDir, 0777, true);
            }

            $fileName = time() . '_' . basename($_FILES['image']['name']);
            $targetFile = $targetDir . $fileName;
            move_uploaded_file($_FILES['image']['tmp_name'], $targetFile);

            $image = 'uploads/' . $fileName;
        }

        if (!$name || $price <= 0) {
            echo json_encode(['success' => false, 'error' => 'Name and valid price are required.']);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO products (name, description, price, category, quantity, image) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssdisi', $name, $description, $price, $category, $quantity, $image);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Product added successfully.']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to add product.']);
        }
        exit;
    }
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
?>
<?php
require __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true) ?? [];

if ($method === 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'error' => 'Please log in before checkout.']);
        exit;
    }

    $items = $data['items'] ?? [];
    $shippingAddress = $data['shippingAddress'] ?? [];
    $total = (float) ($data['total'] ?? 0);
    $paymentMethod = $data['paymentMethod'] ?? 'cod';

    if (empty($items)) {
        echo json_encode(['success' => false, 'error' => 'Cart is empty.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO orders (user_id, total, payment_method, shipping_address, status) VALUES (?, ?, ?, ?, 'pending')");
    $shippingJson = json_encode($shippingAddress);
    $userId = (int) $_SESSION['user_id'];

    $stmt->bind_param('idss', $userId, $total, $paymentMethod, $shippingJson);

    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'error' => 'Order creation failed.']);
        exit;
    }

    $orderId = $stmt->insert_id;

    foreach ($items as $item) {
        $productId = (int) ($item['id'] ?? 0);
        $quantity = (int) ($item['quantity'] ?? 1);
        $price = (float) ($item['price'] ?? 0);

        $itemStmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
        $itemStmt->bind_param('iiid', $orderId, $productId, $quantity, $price);
        $itemStmt->execute();
    }

    echo json_encode(['success' => true, 'message' => 'Order created successfully.', 'order_id' => $orderId]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
?>
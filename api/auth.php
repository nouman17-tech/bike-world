<?php
require __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true) ?? [];

if ($method === 'POST') {
    $action = $_GET['action'] ?? '';

    if ($action === 'register') {
        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $phone = trim($data['phone'] ?? '');
        $address = trim($data['address'] ?? '');

        if (!$name || !$email || !$password) {
            echo json_encode(['success' => false, 'error' => 'Name, email, and password are required.']);
            exit;
        }

        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, 'user')");
        $stmt->bind_param('sssss', $name, $email, $hash, $phone, $address);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Registration successful.']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Registration failed. Email may already exist.']);
        }
        exit;
    }

    if ($action === 'login') {
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if (!$email || !$password) {
            echo json_encode(['success' => false, 'error' => 'Email and password are required.']);
            exit;
        }

        $stmt = $conn->prepare("SELECT id, name, email, password, role FROM users WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            echo json_encode(['success' => false, 'error' => 'Invalid email or password.']);
            exit;
        }

        $user = $result->fetch_assoc();
        if (!password_verify($password, $user['password'])) {
            echo json_encode(['success' => false, 'error' => 'Invalid email or password.']);
            exit;
        }

        $_SESSION['user_id'] = (int) $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_role'] = $user['role'];

        echo json_encode([
            'success' => true,
            'user' => [
                'id' => (int) $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ]);
        exit;
    }
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
?>
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "sams";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data)) {
    echo json_encode(["status" => "error", "message" => "No data provided"]);
    exit();
}

$successCount = 0;
// Note: Matches Ather specific fields (barcode, auditor_name)
$stmt = $conn->prepare("INSERT INTO ather_audit_archive (timestamp, barcode, auditor, city, branch, method, remarks) VALUES (?, ?, ?, ?, ?, ?, ?)");

foreach ($data as $row) {
    $stmt->bind_param("sssssss", 
        $row['timestamp'], 
        $row['barcode'], 
        $row['auditor_name'], 
        $row['city'], 
        $row['branch'], 
        $row['method'], 
        $row['remarks']
    );
    if ($stmt->execute()) {
        $successCount++;
    }
}

$stmt->close();
$conn->close();

echo json_encode([
    "status" => "success", 
    "message" => "$successCount Ather records moved to Local Archive."
]);
?>
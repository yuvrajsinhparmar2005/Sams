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
$stmt = $conn->prepare("INSERT INTO audit_archive (timestamp, barcode, auditor, city, branch, method, remarks, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

foreach ($data as $row) {
    $stmt->bind_param("ssssssss", 
        $row['timestamp'], 
        $row['barcodeData'], 
        $row['auditBy_Name'], 
        $row['auditLocation_City'], 
        $row['auditLocation_Branch'], 
        $row['entryMethod'], 
        $row['remarks'], 
        $row['auditPhotoPath']
    );
    if ($stmt->execute()) {
        $successCount++;
    }
}

$stmt->close();
$conn->close();

echo json_encode([
    "status" => "success", 
    "message" => "$successCount records moved to MySQL successfully."
]);
?>
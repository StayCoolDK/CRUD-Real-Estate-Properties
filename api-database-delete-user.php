<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "RealEstate";

$sId = $_GET['id'];

try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$statement = $conn->prepare("DELETE FROM users WHERE id=$sId;");

$statement->execute();

echo '{"status":"ok"}';

}
catch(PDOException $e) {
echo "Error: " . $e->getMessage();
}
$conn = null;
?>

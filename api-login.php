<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "RealEstate";


	$sUsername = $_POST['username'];
	$sPassword = $_POST['password'];

try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("SELECT * FROM users WHERE username = :username OR email = :username");
$stmt->bindValue(':username', $sUsername);
$stmt->execute();

$aUser = $stmt->fetch(PDO::FETCH_ASSOC);
$bHash = password_verify($sPassword, $aUser['password']);


$jUser = new StdClass; //otherwise it gives this warning: Creating default object from empty value
$jUser->id = $aUser['id'];
$jUser->username = $aUser['username'];
$jUser->email = $aUser['email'];
$jUser->role = $aUser['role'];
$jUser->verified = $aUser['verified'];

$_SESSION['jUser'] = $jUser; // RAM

//If there was atleast 1 match with the usernamd and password aswell as the password hash being valid
//echo the session back to the client as a string of json object. 

if(count($jUser) > 0 && $bHash){
	echo json_encode( $_SESSION['jUser'] );
	exit;
}


}

catch(PDOException $e) {
echo "Error: " . $e->getMessage();
}



?>
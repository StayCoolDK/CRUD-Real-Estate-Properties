<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "RealEstate";

$sId = $_POST['id'];
$sUsername = $_POST['username'];
$sPassword = $_POST['password'];
$sEmail = $_POST['email'];
$sRole = $_POST['role'];

if( isset($_POST['verified']) ) {
	$bVerified = true;
}else{
	$bVerified = false;
}

try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


if (strpos($sPassword, '$2y') !== false) {
	//Password contains '$2y' which means it's already hashed, insert plain-text pw
	$statement = $conn->prepare("UPDATE users SET username = '$sUsername', password = '$sPassword', email = '$sEmail', role = '$sRole', verified = '$bVerified'  WHERE id=$sId;");
	$statement->execute();
	echo '{"status":"ok"}';

}else{
	//Password does not contain '$2y' which means it's not hashed, insert hashed pw
	$hashedPw = password_hash($sPassword, PASSWORD_BCRYPT);
	$bHash = password_verify($sPassword, $hashedPw);
	if($bHash){
	   $statement = $conn->prepare("UPDATE users SET username = '$sUsername', password = '$hashedPw', email = '$sEmail', role = '$sRole', verified = '$bVerified'  WHERE id=$sId;");
	   $statement->execute();
	   echo '{"status":"ok"}';
	}
}

}
catch(PDOException $e) {
echo "Error: " . $e->getMessage();
}
$conn = null;

?>

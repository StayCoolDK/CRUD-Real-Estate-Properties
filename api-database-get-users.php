<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "RealEstate";

try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $conn->prepare("SELECT * FROM users");


$stmt->execute();

$aUsers = $stmt->fetchAll(); 

$aData = [];

foreach( $aUsers as $aUser ){
    $sResult = json_decode('{}');

    $sResult->id = $aUser['id'];
    $sResult->username = $aUser['username'];
   	$sResult->password = $aUser['password'];
    $sResult->email = $aUser['email'];
    $sResult->role = $aUser['role'];
    $sResult->verified = $aUser['verified'];
    array_push( $aData , $sResult );
}
$sData = json_encode( $aData );

echo $sData;

//loop through the array of users (taken from db), encode it in json string and echo it to the client.


}
catch(PDOException $e) {
echo "Error: " . $e->getMessage();
}
?>

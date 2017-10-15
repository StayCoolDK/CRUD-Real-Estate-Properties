<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "RealEstate";

//Pass the user's info. No need to pass the ID since our DB autoincrements.
$sUsername = $_POST['username'];
$sPassword = $_POST['password'];
$sEmail = $_POST['email'];
$sRole = $_POST['role'];
$bVerified = false;
//$sIP = $_SERVER['REMOTE_ADDR'];

//Server side validation
$bEmail = fnIsEmailValid($sEmail);
$bName = fnIsTextValid($sUsername, 2, 30);
$bPassword = fnIsTextValid($sPassword, 5, 60);

//hashed password with salt (always 60 char)
$hashedPw = password_hash($sPassword, PASSWORD_BCRYPT);


try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$statement = $conn->prepare("INSERT INTO users (username, password, email, role, verified) VALUES (:username, :password, :email, :role, :verified);");

$statement->bindValue(':username', $sUsername);
$statement->bindValue(':password', $hashedPw);
$statement->bindValue(':email', $sEmail);
$statement->bindValue(':role', $sRole);
$statement->bindValue(':verified', $bVerified);

//If the statement was executed, and the input is valid
if($statement->execute() && $bEmail && $bName && $bPassword){
		echo '{"status":"ok"}';
		$headers = "From: noreply@realestate.dk";
		$msg = "Hello $sUsername\nThank you for registering to the Real Estate system.\nMuch <3 from RealEstate.dk";
		// use wordwrap() if lines are longer than 70 characters
		$msg = wordwrap($msg,70);
		// send email
		mail($sEmail,"Thank you for registering!",$msg,$headers);
	}
else{
	echo '{"status":"error"}';
}


}

//catch the error
catch(PDOException $e) {
echo "Error: " . $e->getMessage();
}
$conn = null;



	function fnIsTextValid( $sText, $iMin, $iMax  ){
		if(  strlen($sText) < $iMin || strlen($sText) > $iMax){
			return false;
		}
		return true;
	}

	function fnIsEmailValid( $sEmail ) {
	    return filter_var(  $sEmail , FILTER_VALIDATE_EMAIL) && preg_match('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $sEmail);
	}	

?>

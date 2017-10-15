<?php

$sId = $_GET['id'];
$sFileName = "data-properties.txt";

$sajProperties = file_get_contents( $sFileName );
$ajProperties = json_decode( $sajProperties );
if( !is_array($ajProperties ) ){
	echo '{"status":"error"}';
	exit;
}


for( $i = 0; $i < count($ajProperties) ; $i++ ){
	// check if the ids match
	if( $sId ==  $ajProperties[$i]->sUniqueId  ){
		array_splice( $ajProperties , $i , 1 );
		break;
	}
}

// object to text
$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

// save the data in the file
file_put_contents( $sFileName , $sajProperties );

echo '{"status":"ok"}';


?>
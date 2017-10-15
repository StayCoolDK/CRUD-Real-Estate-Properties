<?php


	$sFileName = "data-properties.txt";

	$sajProperties = file_get_contents( $sFileName );
	$ajProperties = json_decode( $sajProperties );
	if( !is_array($ajProperties ) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}

	// SUCCESS
	// $sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	$sajProperties = json_encode( $ajProperties , JSON_UNESCAPED_UNICODE );
	echo $sajProperties;


?>
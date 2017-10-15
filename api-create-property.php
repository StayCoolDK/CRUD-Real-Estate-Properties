<?php

	$sAddress = $_POST['address'];
	$iPrice = $_POST['price'];
	$iSize = $_POST['size'];
	$iRooms = $_POST['rooms'];

	$oImage1 = '/cms-v3/imageuploads/'. $_POST['image1'];
	$oImage2 = '/cms-v3/imageuploads/'. $_POST['image2'];
	$oImage3 = '/cms-v3/imageuploads/'. $_POST['image3'];
	$oImage4 = '/cms-v3/imageuploads/'. $_POST['image4'];
	$oImage5 = '/cms-v3/imageuploads/'. $_POST['image5'];


	$fLat = $_POST['lat'];
	$fLng = $_POST['lng'];
	$sCreationDate = date("Y-m-d"); 

	$sFileName = "data-properties.txt";

	//Validation server side. 

	$bAddress = fnIsTextValid($sAddress, 5, 50);
	$bPrice = fnIsTextValid($iPrice, 1, 50);
	$bSize = fnIsTextValid($iSize, 1, 10);
	$bRooms = fnIsTextValid($iRooms, 1, 50);
	$bLat = fnIsTextValid($fLat, 1, 100);
	$bLng = fnIsTextValid($fLng, 1, 100);


	//If everything is valid, create the property.

if($bAddress && $bPrice && $bSize && $bRooms && $bLat && $bLng){

	$sajProperties = file_get_contents( $sFileName );
	$ajProperties = json_decode( $sajProperties );

	//If our $ajProperties isn't inside an array[] then it's broken syntax - reset.
	if( !is_array($ajProperties ) ){
		$ajProperties = [];
	}
	$jProperty = json_decode('{}'); // json object

	$jProperty->sUniqueId = count($ajProperties)+100001;
	$jProperty->sAddress = $sAddress; 
	$jProperty->iPrice = $iPrice; 
	$jProperty->iSize = $iSize;
	$jProperty->iRooms = $iRooms;
	$jProperty->oImage1 = $oImage1;
	$jProperty->oImage2 = $oImage2;
	$jProperty->oImage3 = $oImage3;
	$jProperty->oImage4 = $oImage4;
	$jProperty->oImage5 = $oImage5;
	$jProperty->fLat = $fLat;
	$jProperty->fLng = $fLng;
	$jProperty->sCreationDate = $sCreationDate;

	// push it to the array
	array_push( $ajProperties , $jProperty );

	// object to text
	$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajProperties );


	echo '{"status":"ok"}';

}else{
	echo '{"status":"error"}';
}

	function fnIsTextValid( $sText, $iMin, $iMax  ){
		if(  strlen($sText) < $iMin || strlen($sText) > $iMax){
			return false;
		}
		return true;
	}

?>
<?php
	// UPDATE PROPERTY
	$sId = $_POST['id'];
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

	$sFileName = "data-properties.txt";

    //validation server

	$bAddress = fnIsTextValid($sAddress, 5, 50);
	$bPrice = fnIsTextValid($iPrice, 1, 50);
	$bSize = fnIsTextValid($iSize, 1, 10);
	$bRooms = fnIsTextValid($iRooms, 1, 50);
	$bLat = fnIsTextValid($fLat, 1, 100);
	$bLng = fnIsTextValid($fLng, 1, 100);


if($bAddress && $bPrice && $bSize && $bRooms && $bLat && $bLng){

	$sajProperties = file_get_contents( $sFileName );
	$ajProperties = json_decode( $sajProperties );
	if( !is_array($ajProperties ) ){
		$ajProperties = [];
	}

	for( $i = 0; $i < count($ajProperties) ; $i++ ){
		// check if the ids match
		if( $sId ==  $ajProperties[$i]->sUniqueId  ){
			// update the property based on the position in the array
			$ajProperties[$i]->sAddress = $sAddress;
			$ajProperties[$i]->iPrice = $iPrice;
			$ajProperties[$i]->iSize = $iSize;
			$ajProperties[$i]->iRooms = $iRooms;
			$ajProperties[$i]->oImage1 = $oImage1;
			$ajProperties[$i]->oImage2 = $oImage2;
			$ajProperties[$i]->oImage3 = $oImage3;
			$ajProperties[$i]->oImage4 = $oImage4;
			$ajProperties[$i]->oImage5 = $oImage5;
			$ajProperties[$i]->fLat = $fLat;
			$ajProperties[$i]->fLng = $fLng;
			break;
		}
	}


	// object to text
	$sajProperties = json_encode( $ajProperties , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajProperties );

	echo '{"status":"ok"}';
}
else{
	echo '{"status":"error"}';
}
	
	function fnIsTextValid( $sText, $iMin, $iMax  ){
		if(  strlen($sText) < $iMin || strlen($sText) > $iMax){
			return false;
		}
		return true;
	}

?>
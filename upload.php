<?php

for($i=0 ; $i<count($_FILES) ; $i++){
	move_uploaded_file( $_FILES['file-'.$i]['tmp_name'] , __DIR__.'/imageuploads/'. $_FILES['file-'.$i]['name'] );
}


?>
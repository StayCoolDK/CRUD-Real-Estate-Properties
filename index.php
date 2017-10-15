<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="css-app.css"> 
	<link rel="stylesheet" type="text/css" href="css-property.css">
	<link rel="stylesheet" type="text/css" href="css-user.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="../dist/sweetalert.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<title>Real Estate CMS</title>

</head>
<body>


<div id="menu-bars">
	<div class="menu-bar"></div>
	<div class="menu-bar"></div>
	<div class="menu-bar"></div>
</div>

<div id="menu">

		<div class="link fa fa-home" data-go-to="wdw-main-menu" id="wdwMenuHome"> Home</div>
		<div class="link fa fa-sign-in" data-go-to="wdw-login" id="wdwMenuLogin"> Login</div>
		<div class="link fa fa-user-plus" data-go-to="wdw-register" id="wdwMenuSignup"> Signup</div>
    <div class="link fa fa-wrench" data-go-to="wdw-settings" id="wdwMenuSettings" style="display: none"> Settings</div>

    <div data-go-to="wdw-create-property" class="fa fa-plus link" id="lblCreateProperty"> Create Property</div>
    <div data-go-to="wdw-create-user" class="fa fa-plus link" id="lblCreateUser"> Create User</div>
    <div data-go-to="wdw-users" class="fa fa-user link" id="lblListUsers"> View Users</div>
</div>


<div id="content-cover"></div>

	<div id="wdw-main-menu" class="wdw" style="overflow: scroll;     overflow-x: hidden;">

	</div>

<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="readmap"></div>
  </div>

</div>

<div id="pictureModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close2">&times;</span>
    
  </div>

</div>

<div id="wdw-settings" class="wdw">
<?php
echo 'Running PHP version: ' . phpversion();
?>
<p>Current CMS version: 1.0</p>
</div>

	<div id="wdw-properties" class="wdw">

	</div>


	<div id="wdw-users" class="wdw">
	</div>


	<div id="wdw-create-property" class="wdw"> 

			<div class="login-page" style="width: 450px">
			<form action="upload.php" method="post" id="frmCreateProperty" class="form" style="max-width: 450px" enctype="multipart/form-data" accept-charset="utf-8">
			<div class="frmRegisterTitle"></div>

				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-hashtag fa-fw"></i></span>
					<input class="form-control" type="text" name="id" id="txt-create-property-id" readonly placeholder="ID (auto-increments)" style="background-color: darkgrey">
				</div>

  				<div class="input-group">
    				<span class="input-group-addon"><i class="fa fa-address-card-o fa-fw"></i></span>
    				<input class="form-control validate" type="text" name="address" id="txt-create-property-address" placeholder="Address" data-min="5" data-max="50">
 				</div>
  
 				 <div class="input-group">
   					 <span class="input-group-addon"><i class="fa fa-usd fa-fw"></i></span>
    				<input class="form-control validate number" type="number" value="0" min="0" name="price" id="txt-create-property-price" placeholder="Price" data-min="1" data-max="50">
  				</div>
  				<div class="input-group">
   					 <span class="input-group-addon"><i class="fa fa-home fa-fw"></i></span>
    				<input class="form-control validate number" type="number" value="0" min="0" name="size" id="txt-create-property-size" placeholder="Size(m2)" data-min="1" data-max="10">
  				</div>
  				<div class="input-group">
   					 <span class="input-group-addon"><i class="fa fa-cubes fa-fw"></i></span>
    				<input class="form-control validate number" type="number" value="0" min="0" name="rooms" id="txt-create-property-rooms" placeholder="Number of Rooms" data-min="1" data-max="50">
  				</div>

  				<div class="input-group" id="imageDiv" name="image-0">   
  				   	<span class="input-group-addon"><i class="fa fa-file-image-o fa-fw"></i></span>    
          			<input class="file" type="file" name="file-0" accept="image/*" style="height: 100%" id="txt-create-property-image" required>
                  <img class="img-preview" style="max-height: 150px" src=""></img> 

          </div>

  				<div class="input-group" style="display: none" >
   					 <span class="input-group-addon"><i class="fa fa-location-arrow fa-fw"></i></span>
    				<input class="form-control validate number" type="text" name="lat" id="txt-create-property-lat" placeholder="Lat" data-min="1" data-max="100">
  				</div>

  				<div class="input-group" style="display: none">
   					 <span class="input-group-addon"><i class="fa fa-location-arrow fa-fw"></i></span>
    				<input class="form-control validate number" type="text" name="lng" id="txt-create-property-lng" placeholder="Lng" data-min="1" data-max="100">
  				</div>
  				<div class="input-group">
              <div id="floating-panel">
                  <input id="address" type="textbox" placeholder="Type an address..." style="padding-left: 5px">
                  <input id="btnMapSearch" type="button" value="Mark location" style="padding: 0px">
              </div>
					  	<div id="map"></div>
  				</div>


				<input type="submit" value="Save" class="fa fa-save fa-fw" id="btn-save-property">

			</form>
			</div>
</div>



	<div id="wdw-create-user" class="wdw">

			<div class="login-page">
			<form action="" method="post" id="frmCreateUser" class="form">
			<div class="frmRegisterTitle"></div>

				<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-hashtag fa-fw"></i></span>
				<input class="form-control" type="text" name="id" id="txt-create-user-id" readonly placeholder="ID (auto-increments)" style="background-color: darkgrey">
				</div>

  				<div class="input-group">
    				<span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span>
    				<input class="form-control validate" type="text" name="username" id="txt-create-user-username" placeholder="Username" data-min="2" data-max="30">
 				</div>
  
 				 <div class="input-group">
   					 <span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
    				<input class="form-control validate" type="password" name="password" id="txt-create-user-password" placeholder="Password" data-min="5" data-max="60">
  				</div>
				<div class="input-group">
    				<span class="input-group-addon"><i class="fa fa-envelope fa-fw"></i></span>
    				<input class="form-control" type="text" name="email" id="txt-create-user-email" placeholder="Email address">
 				</div>

  				<div class="input-group">
 					 <span class="input-group-addon"><i class="fa fa-users fa-fw"></i></span>
  					 <select class="form-control" id="txt-create-user-role" name="role">
 						 <option value="superadmin">Super Admin</option>
  						<option value="admin">Admin</option>
  						<option value="user">User</option>
 					 </select>
 				</div>

				<input type="button" value="Save" class="fa fa-save fa-fw" id="btn-save-user">

			</form>
			</div>
</div>


<div id="wdw-register" class="wdw">
	<div class="login-page">
		<form action="" method="post" id="frmCreateUser" class="form">
			<div class="frmRegisterTitle">Register</div>

  			<div class="input-group">
    			<span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span>
    			<input class="form-control validate" type="text" name="username" id="txtUsername" placeholder="Username" data-min="2" data-max="30">
 			 </div>
  
  			<div class="input-group">
    			<span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
    			<input class="form-control validate" type="password" name="password" id="txtPassword" placeholder="Password" data-min="5" data-max="60">
  			</div>
			<div class="input-group">
    			<span class="input-group-addon"><i class="fa fa-envelope fa-fw"></i></span>
    			<input class="form-control" type="text" name="email" id="txtEmail" placeholder="Email address">
 			 </div>

  			<div class="input-group" style="display: none">
  				<span class="input-group-addon"><i class="fa fa-users fa-fw"></i></span>
  				<select class="form-control" id="txtRole" name="role">
  				<option value="superadmin">Super Admin</option>
  				<option value="admin">Admin</option>
  				<option value="user" selected>User</option>
  				</select>
 			 </div>

			<input type="button" value="register" id="btnRegister">

		</form>
	</div>
</div>


	<div id="wdw-login" class="wdw">

	</div>


<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDj_Yzp44XBCe5ctwbCr71-7bMp2pERr-g">
</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="../dist/sweetalert.min.js"></script>
	<script type="text/javascript" src="js-app.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</body>
</html>
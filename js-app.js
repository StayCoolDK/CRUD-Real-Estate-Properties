//Global role variable
var sUserRole = "user";


var aImages = [];

//Global audio object
var oSound = new Audio('sound.mp3');


//Show and hide the menu on click, by animating and fading.
$("#menu-bars").click( function(){
fnShowMenu();
});

function fnShowMenu(){
$("#menu").animate( { "left": "0px" } , 250 );
$("#content-cover").show();
$("#menu-bars").fadeOut(100);
}

$("#content-cover, .link").click(function(){
fnHideMenu();
});

function fnHideMenu(){
$("#menu").animate( { "left": "-250px" } , 250 );
$("#content-cover").hide();
$("#menu-bars").fadeIn(500);
}


//GET request to fetch all the users in the database.
//if the array of json object is empty (no users), the role should be superadmin for the registration.
//if the array of json object is not empty (users), append the login form for the registered user(s), and show the login window. 

var sURL = "api-database-get-users.php";

$.getJSON(sURL, function(jData) {

    if(jData.length == 0) 
    { 
    $("#wdw-main-menu").hide();
    $("#wdwMenuLogin").hide();
    $("#wdw-register").css("display", "flex");
    $("#txtRole").val("superadmin"); 
    }
    else 
    { 
        $("#wdw-register").css("display", "flex"); //we only want to show the login window, but want registration to be flex displayed.
        $("#wdw-register").hide();
        $("#wdw-login").css("display", "flex");
        $("#wdw-login").append('<div id="frmLoginUser">\
                                  <div class="login-page">\
                                    <div class="form">\
                                      <div class="frmLoginTitle">Login</div>\
                                      <div class="input-group">\
                                        <span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span>\
                                        <input class="form-control" type="text" name="username" id="txtLUsername" placeholder="Username/Email">\
                                      </div>\
                                      <div class="input-group">\
                                        <span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>\
   	                                    <input class="form-control" type="password" name="password" id="txtLPassword" placeholder="Password">\
                                      </div>\
                                      <input type="submit" value="login" id="btnLogin">\
                                    </div>\
                                  </div>\
                                </div>');
    }
});


//AJAX Post the username and password
//if the response is a success, returns a json object containing all the user's info (except password), for me to use.

$(document).on("click", "#btnLogin", function(){

    var sUsername = $("#txtLUsername").val();
    var sPassword = $("#txtLPassword").val();
    var lblBatteryCharge;
/*
<!-- battery-2 : user -->
<!-- battery-3 : admin -->
<!-- battery-4 : superadmin -->
*/

 $.ajax(
        {
            "method"    : "post",
            "url"       : "api-login.php",
            "data"      : {"username":sUsername,"password":sPassword},
            "cache" : false,
            "dataType" : "json"
        }
    ).done( function( jData ){

    $("#wdw-login").hide();
    $("#wdw-main-menu").show();

    $("#menu").append('<button id="btnLogout">Logout</button>');


    $("#wdwMenuLogin").hide(); //already logged in.
    $("#wdwMenuSignup").hide(); //can't register when logged in.

    sUserRole = jData.role;

    //Clear our login textboxes
    $("#txtLUsername").val('');
    $("#txtLPassword").val('');


        if(jData.role == "superadmin"){
        //CRUD Properties + Users
        lblBatteryCharge = 4;

        $("#lblMenuIconUsers").show();
        $("#lblMenuIconProperties").show();
        $("#lblCreateProperty").show();
        $("#lblListProperties").show();
        $("#lblCreateUser").show();
        $("#lblListUsers").show();
        fnGetProperties("superadmin");
        }

        else if(jData.role == "admin"){
        //CRUD Properties
        lblBatteryCharge = 3;
        $("#lblMenuIconProperties").show();
        $("#lblCreateProperty").show();
        $("#lblListProperties").show();
        $("#lblMenuIconUsers").hide();
        $("#lblCreateUser").hide();
        $("#lblListUsers").hide();
        fnGetProperties("admin");
       	}

       	else if (jData.role == "user"){
        //List Properties
        lblBatteryCharge = 2
        $("#lblMenuIconProperties").show();
        $("#lblListProperties").show();
		    $("#lblMenuIconUsers").hide();
        $("#lblCreateUser").hide();
        $("#lblListUsers").hide();
        $("#lblCreateProperty").hide();
        fnGetProperties("user");
        }

            $("#menu").prepend('<div class="lblMenuGreeting">\
                                <div><a class="fa fa-user-circle-o" id="lblUsername"> '+jData.username+'</a></div>\
                                <div><a class="fa fa-battery-'+lblBatteryCharge+'" id="lblUserrole"> '+jData.role+'</a></div>\
                                </div>');

}).fail(function(){
swal("Wrong login!", "Your username/email and password don't match.", "error");
});

});
/************************************************************************/
/************************************************************************/
/************************************************************************/


$(document).on("click", "#btnRegister", function(){

   var sUsername = $("#txtUsername").val();
   var sPassword = $("#txtPassword").val();
   var sEmail = $("#txtEmail").val();
   var sRole = $("#txtRole").val();


//Validate email client side.
   $("#txtEmail").removeClass("invalid");

   var bValid = fnIsEmailValid( sEmail );
   if( bValid == false ){
          $("#txtEmail").addClass("invalid");
   }

//Validate text client side (minimum, maximum amount of chars)
var oParent = $(this).parent();
var aoChildren = oParent.children().children().siblings('.form-control.validate');
for(var i = 0; i < aoChildren.length; i++){
var oInput = $ ( aoChildren[i] );
oInput.removeClass('invalid');
var sText = oInput.val();
var iMin = oInput.attr('data-min');
var iMax = oInput.attr('data-max');
if(sText.length < iMin || sText.length > iMax ){
oInput.addClass('invalid');
console.log("invalid");
} 

}

//If there is no input boxes with an invalid class, and the email is valid:
//AJAX post and create a user
//If the response is OK the user is created and a welcome email has been sent.

if(!aoChildren.hasClass('invalid') && bValid){

 $.ajax(
        {
            "method"    : "post",
            "url"       : "api-database-create-user.php",
            "data"      : {"username":sUsername,"password":sPassword,"email":sEmail,"role":sRole},
            "cache" : false,
            "dataType" : "json"
        }
    ).done( function( jData ){
    if(jData.status == "ok"){

    swal("Successful registration!", "Hello "+sUsername+", nice to meet you!", "success");  

    $("#wdw-register").hide();
    $("#wdw-login").css("display","flex");
    $("#wdwMenuLogin").show();


    if(sRole == "superadmin"){

        $("#wdw-login").append('<div id="frmLoginUser">\
                                  <div class="login-page">\
                                    <div class="form">\
                                         <div class="frmLoginTitle">Login</div>\
                                         <div class="input-group">\
                                            <span class="input-group-addon"><i class="fa fa-user-o fa-fw"></i></span>\
                                            <input class="form-control" type="text" name="username" id="txtLUsername" placeholder="Username/Email">\
                                         </div>\
                                         <div class="input-group">\
                                            <span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>\
   	                                        <input class="form-control" type="password" name="password" id="txtLPassword" placeholder="Password">\
                                         </div>\
                                          <input type="submit" value="login" id="btnLogin">\
                                     </div>\
                                   </div>\
                                </div>');
       	 
       $("#txtRole").val("user"); //set back to default now that the super admin registered.
       $("#wdw-main-menu").hide();
    }

    //clear registration textboxes
    $("#txtUsername").val('');
    $("#txtPassword").val('');
    $("#txtEmail").val('');

    }
    else if(jData.status == "error") {
        swal("Input is not valid!", "Your input is not valid. Username must be min 2, max 30. Password min 5, max 60. Email must be valid.", "warning");
    }

    }).fail( function() {
        swal("Username has been taken!", "Please select a different username.", "error");
    });
}

});


/************************************************************************/
/************************************************************************/
/************************************************************************/
$(document).on("click", "#btnLogout", function(){

    $.getJSON("api-delete-session.php", function(jData){
        if(jData.status == "ok"){
        sUserRole = "user";
        fnHideMenu();
        $("#lblMenuIconProperties").hide();
        $("#lblCreateProperty").hide();
        $("#lblListProperties").hide();
        $("#lblMenuIconUsers").hide();
        $("#lblCreateUser").hide();
        $("#lblListUsers").hide();
        $("#btnLogout").remove();
        $("#wdw-main-menu").show();
        $(".lblMenuGreeting").empty();
        $("#wdwMenuLogin").show();
        $("#wdwMenuSignup").show();
        fnGetProperties("user");
    }
});

});


/************************************************************************/
/************************************************************************/
/************************************************************************/

$(document).on("click",".link", function(){
      $(".wdw").hide();
      var sWindowToShow = $(this).attr("data-go-to");
     $("#"+sWindowToShow).show();

      // get the property properties
      var sPropertyIdToEdit = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-id").text();
      var sPropertyAddressToEdit = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-address").text();
      var sPropertyPriceToEdit = $(this).parent().parent().parent().siblings(".lbl-property-price").text();

      var sPropertySizeToEdit = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-size").text();
      var sPropertyRoomsToEdit = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-rooms").text();

      var sPropertyLatToEdit = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-lat").text();
      var sPropertyLngToEdit = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-lng").text();


      /*

      var sPropertyImage1ToEdit = $(this).parent().parent().parent().siblings(".property-gallery").children().eq(0).attr("src");
      var sPropertyImage2ToEdit = $(this).parent().parent().parent().siblings(".property-gallery").children().eq(1).attr("src");
      var sPropertyImage3ToEdit = $(this).parent().parent().parent().siblings(".property-gallery").children().eq(2).attr("src");
      var sPropertyImage4ToEdit = $(this).parent().parent().parent().siblings(".property-gallery").children().eq(3).attr("src");
      var sPropertyImage5ToEdit = $(this).parent().parent().parent().siblings(".property-gallery").children().eq(4).attr("src");

      Can't set "input type file value/src" due to security reasons.
      */


      //input the values for me to edit
      $("#txt-create-property-id").val( sPropertyIdToEdit );
      $("#txt-create-property-address").val( sPropertyAddressToEdit );
      $("#txt-create-property-price").val( sPropertyPriceToEdit );
      $("#txt-create-property-size").val( sPropertySizeToEdit );
      $("#txt-create-property-rooms").val( sPropertyRoomsToEdit );

      $("#txt-create-property-lat").val( sPropertyLatToEdit );
      $("#txt-create-property-lng").val( sPropertyLngToEdit );

      if(sWindowToShow == "wdw-create-property"){
        initEditMap(); //No parameters: Default location (Rådhuspladsen).
      }

      // get the user properties 
      var sUserIdToEdit = $(this).parent().siblings().children(".lbl-user-id").text();
      var sUserUsernameToEdit = $(this).parent().siblings().children(".lbl-user-username").text();
      var sUserPasswordToEdit = $(this).parent().siblings().children(".lbl-user-password").text();
      var sUserRoleToEdit = $(this).parent().siblings().children(".lbl-user-role").text();
      var sUserEmailToEdit = $(this).parent().siblings().children(".lbl-user-email").text();
      var sUserVerifiedToEdit = $(this).parent().siblings().children(".lbl-user-verified").text();

      //input the values for me to edit
      $("#txt-create-user-id").val( sUserIdToEdit );
      $("#txt-create-user-username").val( sUserUsernameToEdit );
      $("#txt-create-user-password").val( sUserPasswordToEdit );
      $("#txt-create-user-email").val( sUserEmailToEdit );
      $("#txt-create-user-verified").val ( sUserVerifiedToEdit );

      if(sUserRoleToEdit){
          $("#txt-create-user-role").val( sUserRoleToEdit );
      }else{
          $("#txt-create-user-role").val( 'user' );
      }

});
/************************************************************************/
/************************************************************************/
/************************************************************************/

$(".wdw").contextmenu(function(event){
      $(".wdw").hide();
      fnGetProperties(sUserRole);
      $("#wdw-main-menu").show();
      event.preventDefault();
});

/************************************************************************/
/************************************************************************/
/************************************************************************/

$(document).on("click", "#btn-save-property", function(){

    var sId = $("#txt-create-property-id").val();
    var sAddress = $("#txt-create-property-address").val();
    var iPrice = $("#txt-create-property-price").val();
    var iSize = $("#txt-create-property-size").val();
    var iRooms = $("#txt-create-property-rooms").val();
    var fLat = $("#txt-create-property-lat").val();
    var fLng = $("#txt-create-property-lng").val();

   // var oImage = document.getElementById("txt-create-property-image").files[0].name; 
    var oImage1 = aImages[0];
    var oImage2 = aImages[1];
    var oImage3 = aImages[2];
    var oImage4 = aImages[3];
    var oImage5 = aImages[4];


    if (oImage2 == null || oImage2 == "" || oImage2 == "undefined"){
      oImage2 = "default.png";
    }
    if(oImage3 == null || oImage3 == "" || oImage3 == "undefined"){
      oImage3 = "default.png";
    }
    if(oImage4 == null || oImage4 == "" || oImage4 == "undefined"){
      oImage4 = "default.png";
    }
    if(oImage5 == null || oImage5 == "" || oImage5 == "undefined"){
      oImage5 = "default.png";
    }

//validate just the text length based on class
    var oParent = $(this).parent();
    var aoChildren = oParent.children().children().siblings('.form-control.validate');
      for(var i = 0; i < aoChildren.length; i++){
      var oInput = $ ( aoChildren[i] );
      oInput.removeClass('invalid');
      var sText = oInput.val();
      var iMin = oInput.attr('data-min');
      var iMax = oInput.attr('data-max');
           if(sText.length < iMin || sText.length > iMax){
                oInput.addClass('invalid');
            } 
      }

//validate the text length AND if it's NotANumber on class
      var aoChildrenNumber = oParent.children().children().siblings('.form-control.validate.number');
        for(var i = 0; i < aoChildrenNumber.length; i++){
        var oInput = $ ( aoChildrenNumber[i] );
        oInput.removeClass('invalid');
        var sText = oInput.val();
        var iMin = oInput.attr('data-min');
        var iMax = oInput.attr('data-max');
            if(isNaN(sText) || sText.length < iMin || sText.length > iMax){
                oInput.addClass('invalid');
            }
        }

// if this id something, then update
    if( sId ){
        var sUrl = "api-update-property.php";
    }else{ //else create
        var sUrl = "api-create-property.php";
    }

//We need the fLat and Flng for the google map!
    if(fLat == "" || fLng == ""){
      $("#map").css("border", "1px solid red");
       // swal("No location chosen!", "Please click on the map to choose a location.", "warning");
    }


//If our inputs don't have the invalid class, and atleast 1 image was uploaded.
//Create the property.

    if(!aoChildren.hasClass('invalid') && !aoChildrenNumber.hasClass('invalid') && oImage1 != null){
        $.ajax(
        {
            "method"    : "post",
            "url"       : sUrl,
            "data"      : {"id":sId,"address":sAddress,"price":iPrice,"size":iSize,"rooms":iRooms,"image1":oImage1,"image2":oImage2,"image3":oImage3,"image4":oImage4,"image5":oImage5,"lat":fLat,"lng":fLng},
            "cache" : false,
            "dataType" : "json"
        }
        ).done( function( jData ){
            if(jData.status == "ok"){

              $("#frmCreateProperty").submit();

               if(sId){
                    swal("Property Updated!", "You updated property id: "+sId, "success");

                    $("#imageDiv").val("");
                    $("#txt-create-property-image").val("");

                    $("[name='file-0']").val("");
                    $("[name='file-1']").val("");
                    $("[name='file-2']").val("");
                    $("[name='file-3']").val("");
                    $("[name='file-4']").val("");



                    $(".img-preview").attr("src", "");
                    aImages = [];
               }else{
                    $("#imageDiv").val("");
                    $("#txt-create-property-image").val("");

                    $("[name='file-0']").val("");
                    $("[name='file-1']").val("");
                    $("[name='file-2']").val("");
                    $("[name='file-3']").val("");
                    $("[name='file-4']").val("");

                  
                    $(".img-preview").attr("src", "");
                    aImages = [];

                    swal("Property Created!", "You created property address: "+sAddress, "success");
   
                    //aImages = [];

                    oSound.play();
                    notifyMe();
                    var sOriginalTitle = document.title;
                  	var bSwitch = 0;
                    var iCounter = 3;
                    var iTimer = setInterval( function(){
                        if( bSwitch == 0 ){ // it is the original title
           	                document.title = "NEW PROPERTY ADDED";
                          	bSwitch = 1;
       	                }else{
                             document.title = sOriginalTitle;
           	                 bSwitch = 0;
           	                 iCounter--;
                        if( iCounter == 0 ){
                            clearInterval( iTimer ); // Stop the interval
                          }               
                        }
                	} , 1000 );
               }
    }
    else if(jData.status == "error"){
            swal("Input not valid", "There was an error in your input.", "warning");
    }
    });
    }

});

/************************************************************************/
/************************************************************************/
/************************************************************************/

$(document).on("click", "#btn-save-user", function(){

      var sId = $("#txt-create-user-id").val();
      var sUsername = $("#txt-create-user-username").val();
      var sPassword = $("#txt-create-user-password").val();
      var sEmail = $("#txt-create-user-email").val();
      var sRole = $("#txt-create-user-role").val();

      // if this id something, then update
      if( sId ){
          var sUrl = "api-database-edit-user.php";
      }else{ // else create
          var sUrl = "api-database-create-user.php";
      }

      $("#txt-create-user-email").removeClass("invalid");

      var bValid = fnIsEmailValid( sEmail ); 
          if( bValid == false ){
            $("#txt-create-user-email").addClass("invalid");
          }

      var oParent = $(this).parent();
      var aoChildren = oParent.children().children().siblings('.form-control.validate');
      for(var i = 0; i < aoChildren.length; i++){
          var oInput = $ ( aoChildren[i] );
          oInput.removeClass('invalid');
          var sText = oInput.val();
          var iMin = oInput.attr('data-min');
          var iMax = oInput.attr('data-max');
          if(sText.length < iMin || sText.length > iMax ){
              oInput.addClass('invalid');
          } 
      }

      if(!aoChildren.hasClass('invalid') && bValid){

      $.ajax(
      {
            "method"    : "post",
            "url"       : sUrl,
            "data"      : {"id":sId,"username":sUsername,"password":sPassword,"email":sEmail,"role":sRole},
            "cache" : false,
            "dataType" : "json"
      }
      ).done( function( jData ){
          if(jData.status == "ok"){

              if(sId){
                  swal("User Updated!", "You updated user id: "+sId, "success");
              }else{
                  swal("User Created!", "You created user name: "+sUsername, "success");
              }

          }
          else if(jData.status == "error") {
                  alert("The user info isn't valid!");
          }

      });
      }
});

/************************************************************************/
/************************************************************************/
/************************************************************************/

$('[data-go-to="wdw-main-menu"]').click(function(){


//only append edit/delete buttons if the role is superadmin or admin

      if(sUserRole == "superadmin"){
        fnGetProperties("superadmin");
      }
      else if(sUserRole == "admin"){
        fnGetProperties("admin");
      }
      else{
        fnGetProperties("user");
      }

});


/************************************************************************/
/************************************************************************/
/************************************************************************/

$('[data-go-to="wdw-users"]').click(function(){
    fnGetUsers();
});

/************************************************************************/
/************************************************************************/
/************************************************************************/

$(document).on("click" , ".btn-delete-user", function(){
//find the id of the element to then delete
    var sIdToDelete = $(this).parent().siblings("td").children(".lbl-user-id").text();
    var oTheParent = $(this).parent().parent().parent().parent();
    var sUrl = "api-database-delete-user.php?id="+sIdToDelete;
    $.getJSON( sUrl, function(jData){
      if( jData.status == "ok" ){
          $(oTheParent).fadeOut().delay(1000).fadeOut('slow'); 
          oSound.play();
      }
    });
}); 


/************************************************************************/
/************************************************************************/
/************************************************************************/

$(document).on("click" , ".btn-delete-property", function(){
//find the id of the element to then delete


    var sIdToDelete = $(this).parent().parent().parent().siblings().children(".id").children().children(".lbl-property-id").text();
    var oTheParent = $(this).parent().parent().parent().parent().parent();
    var sUrl = "api-delete-property.php?id="+sIdToDelete;
    $.getJSON( sUrl, function( jData){
      if( jData.status == "ok" ){
          oSound.play();
          $(oTheParent).fadeOut().delay(1000).fadeOut('slow'); 
      }
    });
}); 


/************************************************************************/
/************************************************************************/
/************************************************************************/
$(document).on("click", "#btnEdit", function(){

    var sPropertyLatToEdit = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-lat").text();
    var sPropertyLngToEdit = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-lng").text();
    initEditMap(sPropertyLatToEdit, sPropertyLngToEdit);

});


$(document).on("mouseenter", ".property-gallery-image", function() {
    // hover starts code here
var sImageToView = $(this).attr("src");

$(this).parent().parent().siblings().attr("src", sImageToView);


});

$(document).on("click", ".property-gallery-image", function(){


    var modal = document.getElementById('pictureModal');

    var span2 = document.getElementsByClassName("close2")[0];

    modal.style.display = "block";



    var thispic = $(this).attr("src");


    $("#pictureModal").children(".modal-content").append('<img class="modalimg" src="" style="width: 50vw; height: 80vh"></img>');

    $(".modalimg").attr("src", thispic);
    // When the user clicks on <span> (x), close the modal

    span2.onclick = function() {
        modal.style.display = "none";
        //$("#pictureModal").children(".modal-content").empty();
        $("#pictureModal").children(".modal-content").children(".modalimg").remove();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
           modal.style.display = "none";
        //   $("#pictureModal").children(".modal-content").empty();
        $("#pictureModal").children(".modal-content").children(".modalimg").remove();
        }
    }
})


$(document).on("mouseleave", ".property-gallery-image", function() {
    // hover ends code here
    //Reset the image back to default one?
    var thisimg = $(this).attr("src");
    var firstimg = $(this).parent().children().first().attr("src");

    if(firstimg == thisimg){
      $(this).parent().parent().siblings().attr("src", firstimg);
    }
    else{

    var sImageToView2 = $(this).siblings().first().attr("src");

   $(this).parent().parent().siblings().attr("src", sImageToView2);
    }

});


function fnGetProperties(pRole){


    //If the userrole is either superadmin or admin, we allow to edit+delete properties by appending the buttons.
    var sAdminProp = "";
    if (pRole == "superadmin" || pRole == "admin"){
        sAdminProp = '<div data-go-to="wdw-create-property" class="fa fa-edit fa-fw link" style="margin-top: 6px" id="btnEdit"></div>\
                      <div class="fa fa-trash fa-fw btn-delete-property" id="btnTrash" style="margin-top: 5px; cursor: pointer"></div>';
    }

    var sProperty ="        <div class='property'><img src='{{image1}}' class='property-background' style='height: 350px'></img>\
            <div class='property-details'>\
              <h1 class='lbl-property-price'>{{price}}</h1>\
              <div class='property-meta'>\
              <div class='id'>\
                <h4>id</h4>\
                <ul>\
                  <li class='lbl-property-id'>{{id}}</li>\
                </ul>\
              </div>\
              <div class='address'>\
                <h4>Address</h4>\
                <ul>\
                    <li class='lbl-property-address'>{{address}}</li>\
                </ul>\
              </div>\
              </div>\
              <div class='property-meta'>\
              <div class='size'>\
                <h4>Size (m2)</h4>\
                <ul>\
                <li class='lbl-property-size'>{{size}}</li>\
                </ul>\
              </div>\
              <div class='rooms'>\
                <h4>Rooms</h4>\
                <ul>\
                  <li class='lbl-property-rooms'>{{rooms}}</li>\
                </ul>\
              </div>\
            </div>\
            <div class='property-meta' style='display: none'>\
            <div class='lat'>\
              <h4>Lat</h4>\
              <ul>\
                <li class='lbl-property-lat'>{{lat}}</li>\
              </ul>\
            </div>\
            <div class='lng'>\
              <h4>Lng</h4>\
              <ul>\
                <li class='lbl-property-lng'>{{lng}}</li>\
              </ul>\
            </div>\
          </div>\
          <div class='property-meta' style='justify-content: flex-start;'>\
            <div class='date'>\
            <h4>Date added</h4>\
            <ul>\
              <li class='lbl-property-date'>{{date}}</li>\
            </ul>\
            </div>\
            <div class='options'>\
            <h4>Option</h4>\
            <div style='display: flex'>\
            <div class='fa fa-map-marker fa-fw' id='btnMarker'></div>\
                      "+sAdminProp+"\
            </div>\
          </div></div>\
          <div class='property-gallery'><img src='{{image1Copy}}' class='property-gallery-image'></img>\
          <img src='{{image2}}' class='property-gallery-image'></img>\
          <img src='{{image3}}' class='property-gallery-image'></img>\
          <img src='{{image4}}' class='property-gallery-image'></img>\
          <img src='{{image5}}' class='property-gallery-image'></img>\
        </div>\
        </div>";

        var sUrl = "api-get-properties.php";
        $.getJSON( sUrl , function( jData ){

        $("#wdw-main-menu").empty();
        for( var i = 0 ; i < jData.length ; i++ ){
             var sPropertyTemplate = sProperty;


             sPropertyTemplate = sPropertyTemplate.replace( "{{id}}" , jData[i].sUniqueId );
             sPropertyTemplate = sPropertyTemplate.replace( "{{address}}" , jData[i].sAddress );
             sPropertyTemplate = sPropertyTemplate.replace( "{{price}}" , jData[i].iPrice );
             sPropertyTemplate = sPropertyTemplate.replace( "{{size}}" , jData[i].iSize );
             sPropertyTemplate = sPropertyTemplate.replace( "{{rooms}}" , jData[i].iRooms );

             sPropertyTemplate = sPropertyTemplate.replace( "{{image1}}", jData[i].oImage1 );
             sPropertyTemplate = sPropertyTemplate.replace( "{{image1Copy}}", jData[i].oImage1 );
             sPropertyTemplate = sPropertyTemplate.replace( "{{image2}}", jData[i].oImage2 );
             sPropertyTemplate = sPropertyTemplate.replace( "{{image3}}", jData[i].oImage3 );
             sPropertyTemplate = sPropertyTemplate.replace( "{{image4}}", jData[i].oImage4 );
             sPropertyTemplate = sPropertyTemplate.replace( "{{image5}}", jData[i].oImage5 );
             sPropertyTemplate = sPropertyTemplate.replace( "{{lat}}" , jData[i].fLat );
             sPropertyTemplate = sPropertyTemplate.replace( "{{lng}}" , jData[i].fLng );
             sPropertyTemplate = sPropertyTemplate.replace( "{{date}}", jData[i].sCreationDate );
             $("#wdw-main-menu").append( sPropertyTemplate );
        }
        });

};


//open a modal window based on the Lat + Lng

$(document).on("click","#btnMarker",function(){

    var sPropertyLat = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-lat").text();
    var sPropertyLng = $(this).parent().parent().parent().siblings().children().children().children(".lbl-property-lng").text();

    var modal = document.getElementById('myModal');

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    initShowMap(sPropertyLat, sPropertyLng);

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
           modal.style.display = "none";
        }
    }
});
/************************************************************************/
/************************************************************************/
/************************************************************************/
function fnGetUsers(){

    var sUrl = "api-database-get-users.php";
    $.getJSON( sUrl , function( jData ){

    var sUser = '<table id="tblUser" class="table table-bordered"><div class="lbl-user">\
                <thead><tr><th>ID</th><th>Username</th><th>Password</th><th>Email</th><th>Role</th><th>Verified</th><th>Edit</th><th>Delete</th></tr></thead>\
                <tbody><tr><td><div class="lbl-user-id">{{id}}</div></td>\
                <td><div class="lbl-user-username">{{username}}</div></td>\
                <td><div class="lbl-user-password">{{password}}</div></td>\
                <td><div class="lbl-user-email">{{email}}</div></td>\
                <td><div class="lbl-user-role">{{role}}</div></td>\
                <td><div class="lbl-user-verified">{{verified}}</div></td>\
                <td><div data-go-to="wdw-create-user" id="btnEdit" style="color: black" class="fa fa-edit fa-fw link"></div></td>\
                <td><div class="fa fa-user-times fa-fw btn-delete-user btn-trash" style="cursor: pointer"></div></td></tr>\
                </tbody></div></table>';

    $("#wdw-users").empty();
    for( var i = 0 ; i < jData.length ; i++ ){
    var sUserTemplate = sUser;

    sUserTemplate = sUserTemplate.replace( "{{id}}" , jData[i].id );
    sUserTemplate = sUserTemplate.replace( "{{username}}" , jData[i].username );
    sUserTemplate = sUserTemplate.replace( "{{password}}" , jData[i].password );
    sUserTemplate = sUserTemplate.replace( "{{email}}" , jData[i].email );
    sUserTemplate = sUserTemplate.replace( "{{role}}" , jData[i].role );
    sUserTemplate = sUserTemplate.replace( "{{verified}}" , jData[i].verified );
    $("#wdw-users").append( sUserTemplate );
    }

    });

}


/************************************************************************/
/************************************************************************/
/************************************************************************/
$('[data-go-to="wdw-settings"]').click(function(){
       $("#wdw-settings").css("display", "flex");
     });


 function notifyMe() {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("A New Property Was Just Added.");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("A New Property Was Just Added.");
          }
        });
      }

      // At last, if the user has denied notifications, and you 
      // want to be respectful there is no need to bother them any more.
    }



//The map to display when clicking the marker icon (show only map, no actions)

function initShowMap(sLat, sLng){

  function addMarker(sLocation){

  if (marker && marker.setMap) {
    // remove existing marker from the map
    marker.setMap(null);
  }

  var marker = new google.maps.Marker({
            position: sLocation,
            map: map,
  });
  }

  var map = new google.maps.Map(document.getElementById('readmap'), {
    zoom: 15
  });


   var pos = {
        lat: Number(sLat),
        lng: Number(sLng)
   };

   map.setCenter(pos);
   addMarker(pos);
}



//the map to display when creating/editing a property.
//the map adds a marker on click, and features geocode address (search)

function initEditMap(sLat, sLng) {


  if(!sLat && !sLng){ //if they are empty, set rådhuspladsen to default. (create mode)
     sLat = 55.6753;
     sLng = 12.5702;
  }


 function addMarker(sLocation){

  if (marker && marker.setMap) {
    // remove existing marker from the map
    marker.setMap(null);
  }

  var marker = new google.maps.Marker({
            position: sLocation,
            map: map,
    });

  }

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8
  });

  var pos = {
    lat: Number(sLat),
    lng: Number(sLng)
  };

  map.setCenter(pos);

  var geocoder = new google.maps.Geocoder();

  document.getElementById('btnMapSearch').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
              var address = document.getElementById('address').value;
  });

  //If they have values that doesn't match default, we're in edit mode, so add a marker.
  if(sLat != 55.6753 && sLng != 12.5702){
           addMarker(pos);
  }

  google.maps.event.addListener(map, "click", function(event) {
                var clickpos = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
                }
                // show in input box
                document.getElementById("txt-create-property-lat").value = clickpos.lat.toFixed(4);
                document.getElementById("txt-create-property-lng").value = clickpos.lng.toFixed(4);
                                 addMarker(clickpos);
  });

}

    function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;


        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            //4 decimal
           document.getElementById("txt-create-property-lat").value = results[0].geometry.location.lat().toFixed(4);
          document.getElementById("txt-create-property-lng").value = results[0].geometry.location.lng().toFixed(4);

            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location

            });
          } else {
            alert('Locating the address was not successful for the following reason: ' + status);
          }
        });
      }

function fnIsEmailValid( sEmail ) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test( sEmail ); // true or false
}

    var iElementNumber = 0;

    $(document).on('change' , '[type="file"]' , function(){
      var preview = new FileReader();
      preview.readAsDataURL( this.files[0]);



      var self = this;
      preview.onload = function(event){
        $(self).siblings(".img-preview").attr("src", event.target.result);
      }


      if($(self).siblings(".img-preview").attr("src") != ""){


            var files = event.target.files;
            var fileName = this.files[0].name;

          if($(self).attr("name") == "file-0"){
            //splice
            aImages.splice(0, 1, fileName);
          }
          else if($(self).attr("name") == "file-1"){
            //splice
            aImages.splice(1, 1, fileName);
          }
          else if($(self).attr("name") == "file-2"){
            //splice
            aImages.splice(2, 1, fileName);
          }
          else if($(self).attr("name") == "file-3"){
            //splice
            aImages.splice(3, 1, fileName);
          }
          else if($(self).attr("name") == "file-4"){
            //splice
            aImages.splice(4, 1, fileName);
          }


        }
        else{
          var files = event.target.files;
          var fileName = this.files[0].name;
          aImages.push(fileName);
        }

        fnCreateImageInput();
      
    });


    function fnCreateImageInput(){


      iElementNumber++;

      var sDiv = '    <div class="input-group" id="imageDiv" style="width: 100%" name="image-'+iElementNumber+'">\
                            <input class="file" type="file" accept="image/*" name="file-'+iElementNumber+'" style="height: 100%" id="txt-create-property-image">\
                            <img class="img-preview" src="" style="max-height: 150px"></img> \
                      </div>'

      if(iElementNumber < 5){
        $("#imageDiv").append(sDiv);
      }

    }



    $("#frmCreateProperty").on('submit', function(e){


      e.preventDefault();

      
      $.ajax({
        "url":"upload.php",
        "method":"post",
        "data": new FormData(this),
        "contentType":false,
        "processData":false,
        "cache":false
      }).done( function(jData){

      });
      
    });
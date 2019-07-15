   
    var usernameAvailable = false;
   
     $.ajax({
        method:"GET",
        url: "https://cst336.herokuapp.com/projects/api/state_abbrAPI.php",
        dataType: "json",
        success: function(result,status) {
          console.log(result)
          //alert(result[0].county);
          $("#state").html("<option> Select One </option>");
          for(let i=0; i < result.length; i++){
            $("#state").append("<option>" + result[i].usps + "</option>");
          }
        },
        error(res) {
          console.log(res)
        }
     })
   //Displaying City from API after typing a zip code
   $("#zip").on("change",function(){
      //alert($("#zip").val()); 
    $.ajax({
      method:"GET",
      url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
      dataType: "json",
      data: { "zip":$("#zip").val()},
      success: function(result,status) {

        //alert(result);
        $("#city").html(result.city);
        $("#latitude").html(result.latitude);
        $("#longitude").html(result.longitude);
      }
     
    }); //ajax
  });//zip
    
       $("#state").on("change",function(){
        $.ajax({
          method:"GET",
          url: "https://cst336.herokuapp.com/projects/api/countyListAPI.php?state",
          dataType: "json",
          data: { "state":$("#state").val()},
          success: function(result,status) {
            console.log(result)
          
            //alert(result[0].county);
            $("#county").html("<option> Select One </option>");
            for(let i=0; i < result.length; i++){
              $("#county").append("<option>" + result[i].county + "</option>");
            }
          }
     
    });//ajax
   });//state
  
   
   
   
         $("#username").change(function(){
             
          $.ajax({
          method:"GET",
          url: "https://cst336.herokuapp.com/projects/api/usernamesAPI.php",
          dataType: "json",
          data: { "username":$("#username").val()},
          success: function(result,status) {

           if(result.available){
             $("#usernameError").html("Username is available!");
             $("#usernameError").css("color", "white");    
             usernameAvailable=true;
           }
            else{
                $("#usernameError").html("Username is unavailable!");
                $("#usernameError").css("color", "white");    
                usernameAvailable=false;
          
            }
          }
     
    });//ajax
   });//username
            $("#signupForm").on("submit", function(e) {

            if(!isFormValid()){
            
            e.preventDefault();  
            }  
          });
            
            function isFormValid(){
             var isValid = true;
              if(!usernameAvailable){
                isValid = false;
              }
              
              if($("#username").val().length == 0){
                isValid = false;
                $("#usernameError").html("Username is required");
              }
              
              if($("#password").val().length < 6){
                isValid = false;
                $("#passwordLength").html("Password has to be at least 6 characters");
         
              }
              
              if($("#password").val() != $("#passwordAgain").val()){
                $("#passwordAgainError").html("Password Mismatch!");
                isValid = false;
               
              }
              return isValid;
            }
  
   //Displaying Weather from API after typing a zip code
   $("#complete-error").hide();    
   $("#zip-button").on("click",function(){
      if ($("#zip-input").val().length < 5) {
        $("#complete-error").show();
      }
      else {
        $("#complete-error").hide();
        $.ajax({
          method:"GET",
          url: "https://api.openweathermap.org/data/2.5/weather?zip=" + $("#zip-input").val() + ",us&appid=e6fe4cdb7a142bce7c909e7e932ec58f",
          dataType: "json",
          success: function(result,status) {
            //alert(result);
            console.log(result)

            // Convert from Kelvin
            const degreesF = Math.floor((result.main.temp - 273.15) * (9/5) + 32);

            $("#city").html(result.name);
            $("#latitude").html(result.coord.lat);
            $("#longitude").html(result.coord.lon);
            $("#temp").html(degreesF + ' F');
            $("#pressure").html(result.main.pressure);
            $("#humidity").html(result.main.humidity);       
          },

        }); //ajax
      }
  });//zip
    

  
   
  
  
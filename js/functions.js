//grab form input and post to guestbook
function postM() {
  if (!($("#formName").val() == '')) {
    if (!($("#formMess").val() == '')) {
      //grabbing form input, creating DOM elements and adding to message section
      var tempName = document.getElementById("formName").value;
      var tempAge = document.getElementById("formAge").value;
      var tempLoc = document.getElementById("formLoc").value;
      var tempMess = document.getElementById("formMess").value;
      var tempGeo = document.getElementById("geoip").innerHTML;

      var messagenode = document.createElement("p");
      var personnode = document.createElement("p");
      var geonode = document.createElement("p");
      var signode = document.createElement("div");

      var nodebr = document.createElement("br");
      var canv = document.createElement("canvas");

      var textnodeM = document.createTextNode("\"" + tempMess + "\"");
      var fullPerson = document.createTextNode("from " + tempName + " age " + tempAge + ", from " + tempLoc + ".");
      var geoStr = document.createTextNode(tempGeo);

      messagenode.id = "gbMessage";
      personnode.id = "gbPoster";
      canv.id = "userPhoto";

      geonode.appendChild(geoStr);
      messagenode.appendChild(textnodeM);
      personnode.appendChild(fullPerson);

      document.getElementById("messagesdiv").appendChild(messagenode);
      document.getElementById("messagesdiv").appendChild(personnode);
      document.getElementById("messagesdiv").appendChild(geonode);
      document.getElementById("messagesdiv").appendChild(signode);
      document.getElementById("messagesdiv").appendChild(canv);

      //handling graffiti
      exportSig(signode);

      if (!($("#cameraphoto").val() == '')) {
        dispSnapshot(canv);
      }

      //store messages with new post
      storeMessages();

      //reset form for new input
      document.getElementById("messageForm").reset();
      $("#signature").jSignature("reset")
    }
  }


  return false; //don't reload the page
}

//signature is posted in guestbook as a pure svgbase64
function exportSig(signode) {
  var $sigdiv = $("#signature")
  var datapair = $sigdiv.jSignature("getData", "svgbase64");
    var i = new Image();
    i.src = "data:" + datapair[0] + "," + datapair[1];
    $(i).appendTo(signode);
}

//store the guestbook div in local storage
function storeMessages() {
  var tempData = JSON.stringify($("#messagesdiv").html());
  localStorage["messages"] = tempData;
}

//loads the stored guestbook messages back into the div (if they exist)
function loadMessages() {
  if (localStorage["messages"] != null) {
      var contentsOfOldDiv = JSON.parse(localStorage["messages"]);
      $("#messagesdiv").html(contentsOfOldDiv);
     }
}

//load the messages on page ready
//setup deviceshake cancel form input
$( document ).ready(function() {
    maxX = 0;
    maxY = 0;
    maxZ = 0;
    loadMessages();
    window.addEventListener("devicemotion", dealWithMotion);

    $.simpleWeather({
      location: 'Loughborough, uk',
      woeid: '',
      unit: 'c',
      success: function(weather) {
        html = '<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>';

        $("#lboroTemp").html(html);
      },
      error: function(error) {
        $("#lboroTemp").html('<p>'+error+'</p>');
      }
    });
    if ($('#yourTemp').length) {
      if ("geolocation" in navigator) {
        $('yourTemp').show();
        navigator.geolocation.getCurrentPosition(function(position) {
          loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
        });
      } else {
        $('yourTemp').hide();
      }
    }
    if ($('#signature').length) {
      $("#signature").jSignature();
    }

});

//pulls in weather data using simpleweather
function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      html = '<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>';
      $("#yourTemp").html(html);
    },
    error: function(error) {
      $("#yourTemp").html('<p>'+error+'</p>');
    }
  });
}

//displays user photo/image in canvas element
function dispSnapshot(canv){
		//access the file
		var input = document.getElementById("cameraphoto");
		var file = input.files[0];
	  //use HTML5 FileReader API to read the image file as dataURL
	  var reader = new FileReader();
	  reader.readAsDataURL(file);
		//when the read is successful
	  reader.onload = function (e) {
			//use the dataURL to create an image element
	    var dataURL = e.target.result,
	    img = new Image();
	    img.src = dataURL;
	    //create a drawing object
	    ctx = canv.getContext('2d'),
	    img.onload = function() {
	      //set the width and height of canvas
	      canv.width = img.width;
	      canv.height = img.height;
	      //draw the image on canvas
	      ctx.drawImage(img, 0, 0);
	    };
	  };
}

//checks for geolocation functionality
function geoLoc() {
  var options={enableHighAccuracy:true};
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(storeLoc,error,options);
  }
  else {
    alert("Sorry, your browser does not support this function.");
  }

}

//error on geolocatio failure
function error(error) {
  alert("Geolocation Error")
}

//grabs geolocation lat/long, rounds to 2d.p. and replaces geo label/button
function storeLoc(position){
				lat=position.coords.latitude;
        lat = Math.round(lat * 100) / 100;
				long=position.coords.longitude;
        long = Math.round(long * 100) / 100;
        var geoLine = lat + ", ° " + long + "°.";
        document.getElementById("geoip").innerHTML = geoLine;
        $("#tempGeo").remove();
        $("#geoButton").remove();
}

//handle device motion to cancel form input
function dealWithMotion(event){
	if(Math.abs(event.acceleration.x) > maxX || Math.abs(event.acceleration.y) > maxY || Math.abs(event.acceleration.z) > maxZ){
					if(Math.abs(event.acceleration.x) > maxX){
									//document.getElementById("motion_text_x").innerHTML = "x=" + event.acceleration.x + "</br>";
									maxX = Math.abs(event.acceleration.x);
									}
					if(Math.abs(event.acceleration.y) > maxY){
									//document.getElementById("motion_text_y").innerHTML = "y=" + event.acceleration.y + "</br>";
									maxY = Math.abs(event.acceleration.y);
									}
					if(Math.abs(event.acceleration.z) > maxZ){
									//document.getElementById("motion_text_z").innerHTML = "z=" + event.acceleration.z + "</br>";
									maxZ = Math.abs(event.acceleration.z);
									}
	}
	var threshold=20;
	if (Math.abs(event.acceleration.x)>threshold||Math.abs(event.acceleration.y)>threshold||Math.abs(event.acceleration.z)>threshold){
    document.getElementById("messageForm").reset();
	}
}

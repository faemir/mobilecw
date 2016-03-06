//grab form input and post to guestbook
function postM() {
  var tempName = document.getElementById("formName").value;
  var tempAge = document.getElementById("formAge").value;
  var tempGender = document.getElementById("formGender").value;
  var tempLoc = document.getElementById("formLoc").value;
  var tempMess = document.getElementById("formMess").value;
  var tempGeo = document.getElementById("geoip").innerHTML;

  var messagenode = document.createElement("p");
  var personnode = document.createElement("p");
  var geonode = document.createElement("p");

  var nodebr = document.createElement("br");
  var canv = document.createElement("canvas");

  var textnodeM = document.createTextNode("\"" + tempMess + "\"");
  var fullPerson = document.createTextNode("from " + tempName + " age " + tempAge + " - " + tempGender + ", from " + tempLoc + ".");
  var geoStr = document.createTextNode(tempGeo);

  geonode.appendChild(geoStr);
  messagenode.id = "gbMessage";
  personnode.id = "gbPoster";
  canv.className = "userPhoto";

  messagenode.appendChild(textnodeM);
  personnode.appendChild(fullPerson);

  document.getElementById("guestmessages").appendChild(messagenode);
  document.getElementById("guestmessages").appendChild(personnode);
  document.getElementById("guestmessages").appendChild(geonode);
  document.getElementById("guestmessages").appendChild(canv);

  dispSnapshot(canv);
  storeMessages();
  document.getElementById("messageForm").reset();

  return false;
}

//store the guestbook div in local storage
function storeMessages() {
  var tempData = JSON.stringify($("#guestmessages").html());
  alert(tempData);

  //localStorage["messages"]
}

//loads the stored guestbook messages back into the div (if they exist)
function loadMessages() {
  if (localStorage["messages"] != null) {
      var contentsOfOldDiv = JSON.parse(localStorage["messages"]);
      $("#guestmessages").html(contentsOfOldDiv);
     }
}

//load the messages on page ready
$( document ).ready(function() {
    loadMessages();
});

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
	    //select the canvas
	    //c = document.querySelector('canvas'),
      c = canv;
	    //create a drawing object
	    ctx = c.getContext('2d'),
	    img.onload = function() {
	      //set the width and height of canvas
	      c.width = img.width;
	      c.height = img.height;
	      //draw the image on canvas
	      ctx.drawImage(img, 0, 0);
	    };
	  };
}

function geoLoc() {
  var options={enableHighAccuracy:true};
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(storeLoc,error,options);
  }
  else {
    alert("Sorry, your browser does not support this function.");
  }

}

function error(error) {
  alert("Geolocation Error")
}

function storeLoc(position){
				lat=position.coords.latitude;
        lat = Math.round(lat * 100) / 100;
				long=position.coords.longitude;
        long = Math.round(long * 100) / 100;
        var geoLine = "GeoLocation: "+ lat + ", ° " + long + "°.";

        document.getElementById("geoip").innerHTML = geoLine;
        $("#tempGeo").remove();
        $("#geoButton").remove();
}

//grab form input and post to guestbook
function postM() {
  var tempName = document.getElementById("formName").value;
  var tempAge = document.getElementById("formAge").value;
  var tempGender = document.getElementById("formGender").value;
  var tempLoc = document.getElementById("formLoc").value;
  var tempMess = document.getElementById("formMess").value;
  var messagenode = document.createElement("p");
  var personnode = document.createElement("p");
  var textnodeM = document.createTextNode("\"" + tempMess + "\"");
  var fullPerson = document.createTextNode("from " + tempName + " age " + tempAge + " " + tempGender + ", from " + tempLoc + ".");
  var nodebr = document.createElement("br");
  messagenode.id = "gbMessage";
  personnode.id = "gbPoster";
  messagenode.appendChild(textnodeM);
  personnode.appendChild(fullPerson);



  document.getElementById("guestmessages").appendChild(messagenode);
  document.getElementById("guestmessages").appendChild(personnode);
  storeMessages();
  document.getElementById("messageForm").reset();
  return false;
}

//store the guestbook div in local storage
function storeMessages() {
  localStorage["messages"] = JSON.stringify($("#guestmessages").html());
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

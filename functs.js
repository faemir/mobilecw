function postM() {
  var tempName = document.getElementById("formName").value;
  var tempAge = document.getElementById("formAge").value;
  var tempGender = document.getElementById("formGender").value;
  var tempLoc = document.getElementById("formLoc").value;
  var tempMess = document.getElementById("formMess").value;
  var messagenode = document.createElement("p");
  var personnode = document.createElement("p");
  var textnodeM = document.createTextNode(tempMess);
  var fullPerson = document.createTextNode(tempName + ", " + tempAge + ", " + tempGender + ", " + tempLoc);
  var nodebr = document.createElement("br");
  messagenode.appendChild(textnodeM);

  personnode.appendChild(fullPerson);

  document.getElementById("guestmessages").appendChild(messagenode);
  document.getElementById("guestmessages").appendChild(personnode);

  return false;
}

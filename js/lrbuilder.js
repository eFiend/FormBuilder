document.getElementById("formTypes").addEventListener("onchange",buildInputForms);

var chosenForm;

/* Does not yet do anything, but eventually. Need to clarify requirements first. */
function filterForms(){

}

/* Loads the correct form based off of the specified user input. */
function buildInputForms() {
 viewReset();
 var x = document.getElementById("formTypes").value;
 if (x != "Select a type of Lab Request..."){
    document.getElementById("buttonBar").className = "vis";
    if (x == "fieldsProjectExtension"){
       inputBuilder(fieldsProjectExtension);
       for (i = 2; i < 9; i += 2){document.getElementById(i).className = "invis";}}
    else if (x == "fieldsLabAccess"){
       inputBuilder(fieldsLabAccess);}
    else if (x == "fieldsInitialConfig"){
       inputBuilder(fieldsInitialConfig);}
    else if (x == "fieldsCablingChange"){
       inputBuilder(fieldsCablingChange);}
    else if (x == "fieldsLabTour"){
       inputBuilder(fieldsLabTour);}
    else if (x == "fieldsLabratTv"){
       inputBuilder(fieldsLabratTv);}
    else if (x == "fieldsAssetChange"){
       inputBuilder(fieldsAssetChange);}
 }
}

/* Clears the viewing area when users swap between form types. */
function viewReset(){
 document.getElementById("inputArea").innerHTML = ""; 
 document.getElementById("outputText").innerHTML = "";
 document.getElementById("outputText").rows = "1";
 document.getElementById("output").className = "invis";
 document.getElementById("buttonBar").className = "invis";
}

/* Formats the output of each array so that the questions are on the left, 
and answers are on the right. It also emptys the value fields of all answer elements. */
function inputBuilder(x){
 chosenForm = x;
 for (i = 0; i + 1 <= chosenForm.length; i++){
    if (chosenForm == 0 || i % 2 == 0){
       document.getElementById("inputArea").innerHTML += "<tr" + " class='questions' id='" + i + "'>" + "<td>" + chosenForm[i] + " " + "</td>";}
    else {
       document.getElementById(i-1).innerHTML += "<td" + " class='answers' id='" + i + "'>" + chosenForm[i] + " " + "</td>" + "</tr>";}
 }
 try {
       for(i = 1; i - 1 < chosenForm.length / 2; i++){document.getElementById("A" + i).value = "";}
 }catch(err){}  
}      

/* Builds and formats the output of the form, based on the user's input. 
If a field was not populated, then it's corresponding question will not show as output.*/
function buildOutput(){         
 var str = "";
 var j = 1;
 var x = buildOutputTwo();
 for (i = 0; i < chosenForm.length; i+=2){ // iterates through all items in each array.
    if (j-1 < chosenForm.length / 2){ // iterates through only answers in each array.
       if (i == 0){
          str += x + " Template:" + "&#013;&#010;&#010;";
       }
       if (chosenForm == fieldsProjectExtension){
          if (i == 0){str += "Part Status:" + "&#013;&#010;";}
          else if (i == 10){str += "&#013;&#010;Project Status:" + "&#013;&#010;";}       
          if (document.getElementById("A" + j).value == ""){}
          else {str += "- " + chosenForm[i] + " " + document.getElementById("A" + j).value + "&#013;&#010;";}                
       }
       else if(chosenForm == fieldsLabAccess){
          if(document.getElementById("A" + j).value == ""){}
          else {str += "- " + chosenForm[i] + " " + document.getElementById("A" + j).value + "&#013;&#010;";}
       }
       else if (chosenForm == fieldsInitialConfig){
          /* buildOutputThree(str, j, i); <GET THIS TO WORK. */ 
          if(document.getElementById("A" + j).value == ""){}
          else {str += "- " + chosenForm[i] + " " + document.getElementById("A" + j).value + "&#013;&#010;";}
       }
       j++;
    }
 }
 document.getElementById("outputText").innerHTML = str;
 document.getElementById("outputText").rows = "20";
 document.getElementById("output").className = "vis"
}

/* This formats, the outputs the template chosen in the output field. */
function buildOutputTwo(){
 var x = document.getElementById("formTypes").value;
 var x2 = x.slice(6,x.length);
 x = "";
 for (i = 0; i < x2.length; i++){
    if(isUpperCase(x2.charAt(i))){
       if(x == ""){x = "1";}
       else{x = x2.slice(0,i) + " " + x2.slice(i,x2.length);}
    }
 }
 return x;
}

function buildOutputThree(str, j, i){
 if(document.getElementById("A" + j).value == ""){}
 else {str += "" + chosenForm[i] + " " + document.getElementById("A" + j).value + "&#013;&#010;";}
 return str;
}

/* Simple tool to check for capitilized letters. 
Used in conjunction with buildOutputTwo to format the string output correctly. */
function isUpperCase(Char){return (Char >= 'A') && (Char <= 'Z');}

/* The following two setVal functions alow the values of the radio or checkbox fields
to be checked and stored into an accompanying text field. I still need to generalize this
algorithm. */
function setValPE(){
 document.getElementById("A1").value = document.querySelector('input[name=A1]:checked').value;
 document.getElementById("A2").value = "";
 for (i = 1; i < 5; i++){ // find a way to replace i < 5 with an index of name fields.
    try {
       document.getElementById("A2").value += document.querySelector('input[name=A2' + i + ']:checked').value + ", ";
    }catch(err){}            
 }
 var str = document.getElementById("A2").value;
 document.getElementById("A2").value = str.slice(0,str.length-2);
 for (i = 2; i < 9; i += 2){
    if(document.getElementById("A1").value == "Yes"){
       document.getElementById(i).className = "vis";
    }
    else{
       document.getElementById(i).className = "invis";
    }
 }
}

function setValLA(){
 document.getElementById("A4").value = "";
 for (i = 1; i < 6; i++){
    try{
       document.getElementById("A4").value += document.querySelector('input[name=A4' + i + ']:checked').value + ", ";
    }catch(err){}
 }
 var str = document.getElementById("A4").value;
 document.getElementById("A4").value = str.slice(0,str.length-2);
}

/* Question and Answer fields stored in each array. The format is [Q1, A1, Q2, A2,...] */
var fieldsProjectExtension = ['Were parts captured or ordered?', '<input onchange="setValPE()" type="radio" value="Yes" name="A1" required>Yes<input onchange="setValPE()" type="radio" value="No" name="A1" required>No<input class="invis" id="A1" type="text">','Part(s) Origin:','<input onchange="setValPE()" type="checkbox" value="Customer Capture" name="A21">Customer Capture <input onchange="setValPE()" type="checkbox" value="ERT Owned Part(s)" name="A22">ERT Owned Part(s)<input onchange="setValPE()" type="checkbox" value="HP Spares" name="A23">HP Spares <input onchange="setValPE()" type="checkbox" value="Other" name="A24">Other','Part Number(s):','<input id="A3" type="text"><input class="invis" id="A2" type="text">','Part Description(s):','<input id="A4" type="text">','Part Quantity:','<input id="A5" type="text">','Who is handling the technical elevation?','<input id="A6" type="email">','Who is handling the escalation?','<input id="A7" type="email">','Technical issue(s) being tested:','<textarea id="A8" rows="3" cols="50">','Troubleshooting Action Plan:','<textarea id="A9" rows="3" cols="50">','Do complications exist which hinder your ability to complete this project?','<textarea id="A10" rows="3" cols="50">','Have any additional notes?','<textarea id="A11" rows="5" cols="50">','Expected Completion Date:','<input id="A12" type="date">',];

var fieldsLabAccess = ['Purpose of Lab Visit:','<textarea id="A1" rows="3" cols="50">','Names of All Lab Guests:','<textarea id="A2" rows="3" cols="50">','Name of Area or Equipment Being Accessed:','<textarea id="A3" rows="3" cols="50">','Will You Any Need Lab Resources?','<input onchange="setValLA()" type="checkbox" value="Lab Admin" name="A41">Lab Admin <input onchange="setValLA()" type="checkbox" value="Tool Cart" name="A42">Tool Cart <input onchange="setValLA()" type="checkbox" value="Crash Cart" name="A43">Crash Cart <input onchange="setValLA()" type="checkbox" value="KVM Terminal" name="A44">KVM Terminal <input onchange="setValLA()" type="checkbox" value="Other" name="A45">Other','Have any additional notes?','<textarea id="A5" rows="5" cols="50"></textarea><input class="invis" id="A4" type="text" size="1">'];

var fieldsInitialConfig = ['Requester Name:','<input id="A1" type="text">','Requester Email:','<input id="A2" type="text">','Case Number:','<input id="A3" type="text">','Company:','<input id="A4" type="text">','Will you be capturing a customer part?<br /><a href="http://iss-gcc.hp.com/internal/forum/topic.asp?TOPIC_ID=16978">Read Before Capturing!</a>','<input id="A5" type="text">','Part Number(s):','<input id="A6" type="text">','Part Description(s):','<input id="A7" type="text">','Email of Manager Who Approved Capture: ','<input id="A8" type="text">','Owner of the Management Escalation:','<input id="A9" type="text">','Name of People Involved with Escalation:','<input id="A10" type="text">','Name of People Involved with Technical Elevation:','<input id="A11" type="text">','Issue Description:','<textarea id="A12" rows="5" cols="50">','Requested Server Equpiment:','<textarea id="A13" rows="3" cols="50">','Requested Storage Equipment:','<textarea id="A14" rows="3" cols="50">','Requested Networking Equipment:','<textarea id="A15" rows="3" cols="50">','Specific Hardware Configuration Required:','<textarea id="A16" rows="3" cols="50">','Preferred Slot# (Mezz, PCI, Interconnect, etc.','<input id="A17" type="text">','Required OS Version (Build, Update, Service Pack):','<input id="A18" type="text">','Required SPP or PSP Version:','<input id="A19" type="text">','Have Any Additional Configuration Details?','<textarea id="A20" rows="3" cols="50">','Would you prefer the lab-team perform the OS Install?','<input id="A21" type="text">','<strong>For Blades Only:</strong><br />OA & Interconnect Access Required?','<input id="A22" type="text">','Interconnect Required:','<input id="A23" type="text">','IC Module Option Part Number:','<input id="A24" type="text">','IC Module Part Name:','<input id="A25" type="text">','Quantity:','<input id="A26" type="text">','IC Bay Location(s)','<input id="A27" type="text">','SFPs Option Part #:','<input id="A28" type="text">','Uplink Port #:','<input id="A29" type="text">','Cabling Configuration:','<input id="A30" type="text">','Uplink Connectivity (Please include device & port#s)','<input id="A31" type="text">'];

/* Placeholders for Q and A values. */
var fieldsCablingChange = ['Under','Construction'];

var fieldsLabTour = ['Under','Construction'];

var fieldsLabratTv = ['Under','Construction'];

var fieldsAssetChange = ['Under','Construction'];

var fieldsTrainingSession = ['Under','Construction'];

var fieldsLabTour = ['Under','Construction'];
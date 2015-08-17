function buildInputForms() {
   var x = document.getElementById("formTypes").value;
   document.getElementById("inputArea2").innerHTML = "" + x ;
}

function buildOutput() {
   var x = document.getElementById("output")Z
   var t = document.createTextNode("Copy and paste this output into the lab request: ...");
   x.appendChild(t);
   document.body.appendChild(x);
}

/*
//document.getElementById('filecontents').innerHTML = "Punkie";

         var fileTobeRead = 'file:///home/finisterra/Documentos/Test page/test.txt';
         //Initialize the FileReader object to read the file
         var fileReader = new FileReader(); 
         fileReader.onload = function (e) { 
             var fileContents = document.getElementById('filecontents'); 
             fileContents.innerText = fileReader.result;
             cont = fileReader.result;
             console.log(cont);
         } 
         fileReader.readAsText(fileTobeRead);
*/

/*
jQuery(document).ready(function() {
  var myElements = $("#id01");
  var cont;
  jQuery("#demo").text("The text from the id01 paragraph is: " + myElements[0].innerHTML);
  //$("#filecontents").load("data.csv", function( response, status, xhr ) {
  cont.load("data.csv", function( response, status, xhr ) {
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
    $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
  }
});
});
*/
//var cont;

var Xaxis = [];
var Yaxis = [];

jQuery.get("datatest.csv", undefined, process_data, "text");

function process_data(data) {
	var cont = data;
	//document.getElementById('filecontents').innerHTML = cont;
	console.log(cont);
	fun = cont.split(',');
	fun2 = cont.split('\n');
	fun2.pop();				// delete last element which is empty
	console.log(fun2);
	for (var i = 0; i < fun2.length; i++) {
		temp = fun2[i].split(',');
		console.log(temp);
		Xaxis.push(Number(temp[0]));
		Yaxis.push(Number(temp[1]));
	}
	console.log(Xaxis);
	console.log(Yaxis);
}


new Chart(document.getElementById("TChart"), {
  type: 'line',
  data: {
    labels: Xaxis,
    datasets: [{ 
        data: Yaxis,
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    }
  }
});


//console.log(cont);

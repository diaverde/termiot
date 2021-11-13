//var url = "file:///home/finisterra/Documentos/Test%20page/index.html";
//var url = "data.csv";

//getTxt = function (){
//return "dark";
//}

/*

  $.ajax({
	url:'data.csv',
	success: function (data){
		return data;		
      //parse your data here
      //you can split into lines using data.split('\n') 
      //and use regex functions to effectively parse it
    }
  });
}
*/

function LoadFile() {
    var oFrame = document.getElementById("frmFile");
    var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    while (strRawContents.indexOf("\r") >= 0)
        strRawContents = strRawContents.replace("\r", "");
    var arrLines = strRawContents.split("\n");
    alert("File " + oFrame.src + " has " + arrLines.length + " lines");
    for (var i = 0; i < arrLines.length; i++) {
        var curLine = arrLines[i];
        alert("Line #" + (i + 1) + " is: '" + curLine + "'");
    }
}

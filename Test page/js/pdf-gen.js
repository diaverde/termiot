var button = document.querySelector('button');
var input = document.querySelector('input');

button.addEventListener('click', printPDF);

function printPDF() {
	var pdf = new jsPDF();
	pdf.text('El valor que usted pagará es ' + input.value,10,10);
	pdf.text('El valor que usted pagará es ' + input.value,10,15);
	if (pdf.output('dataurlnewwindow','filename')){
		console.log('test');
		console.log(input.value);
	}

}
	

var full_data = [[],[],[],[],[],[],[],[],[],[]];

var dark;
var momis = [];
var quantity1 = 96;					// Cantidad de mediciones a mostrar
var quantity2 = 288;					// Cantidad de mediciones a mostrar
var quantity3 = 672;					// Cantidad de mediciones a mostrar
var quantity = quantity3;				// Cantidad de mediciones a mostrar - valor inicial es el máximo
var last_quantity;					// Almacena la última cantidad de datos antes de ser cambiada
var q1 = 0, q2 =0, q3 = 0, q4 = 0, q5 = 0, q6 = 0, q7 = 0, q8 = 0, q9 = 0, q10 = 0;

create_chart_hum();
create_chart_temp();

// JQuery read of the csv files
jQuery.get("data1.csv", undefined, process_data, "text");
jQuery.get("data2.csv", undefined, process_data, "text");
jQuery.get("data3.csv", undefined, process_data, "text");
jQuery.get("data4.csv", undefined, process_data, "text");
jQuery.get("data5.csv", undefined, process_data, "text");

// Función para procesar los datos
// --------------------------------------------------------
function process_data(data) {
	var cont = data;
	//console.log(cont);
	fun = cont.split(',');
	fun2 = cont.split('\n');
	fun2.pop();				// delete last element which is empty
	//console.log(fun2);
	var cant_csv = fun2.length;			// Contamos cuántas lecturas hay para el bicho correspondiente
	//console.log(cant_csv);
	var data_set_length;
	if (cant_csv < quantity) {			// Escogemos la menor cantidad de datos a mostrar
		data_set_length = cant_csv;
	} else {
		data_set_length = quantity;
	}
	// Se leen los datos más recientes según la cantidad indicada
	for (var i = (cant_csv-data_set_length) ; i < cant_csv; i++) {
		temp = fun2[i].split(',');
		//console.log(temp);
		var bicho = 0;
		switch (temp[2]){
			case "bicho1":
				bicho = 0;
				q1 = cant_csv;
				break;
			case "bicho2":
				bicho = 1;
				q2 = cant_csv;
				break;
			case "bicho3":
				bicho = 2;
				q3 = cant_csv;
				break;
			case "bicho4":
				bicho = 3;
				q4 = cant_csv;
				break;
			case "bicho5":
				bicho = 4;
				q5 = cant_csv;
				break;
			case "bicho6":
				bicho = 5;
				q6 = cant_csv;
				break;
			case "bicho7":
				bicho = 6;
				q7 = cant_csv;
				break;
			case "bicho8":
				bicho = 7;
				q8 = cant_csv;
				break;
			case "bicho9":
				bicho = 8;
				q9 = cant_csv;
				break;
			case "bicho_10":
				bicho = 9;
				q10 = cant_csv;
				break;
			default:
				bicho = -1;				
				break;
		}				
		//console.log("El valor de bicho es: " + bicho);
		if (bicho ==-1){
			break;
		}else{
			full_data[bicho].push(temp);
			// Separación y tratamiento de los datos usando libería "Moments"
			var date_moment = moment(temp[0] + "" + temp[1],"M/D/YY h:m:s");
			//console.log("Va la coversión de momento: ");
			//console.log(date_moment);
			//momis.push(date_moment);		
			//Xaxis.push(date_moment);
			//Yaxis1_1.push(Number(temp[3]));
			addData(hum_chart,date_moment,Number(temp[3]),bicho);
			//Yaxis1_2.push(Number(temp[4]));
			addData(temp_chart,date_moment,Number(temp[4]),bicho);
			//Yaxis1_3.push(Number(temp[5]));
		}
	}
	//console.log(full_data);
	//console.log("Van todos los momentos: ");
	//console.log(momis);
}

// --------------------------------------------------------

// Funciones para crear cada tipo de gráfica: Humedad, Temperatura y Estado de batería
// --------------------------------------------------------
function create_chart_hum(){
	
	hum_chart = new Chart(document.getElementById("HChart"), {
		type: 'line',
		data: {
		//labels: ['2:13:22', '2:13:30', '2:15:00', '2:16:30'],
		//labels: [1, 2, 3, 4],
			labels: [],
			datasets: [{
				data: [],
				label: "Sensor 1",
				borderColor: "#cc3030",
				fill: false
			}, {
				data: [],
				label: "Sensor 2",
				borderColor: "#cc5730",
				fill: false
			}, {
				data: [],
				label: "Sensor 3",
				borderColor: "#894709",
				fill: false
			}, {
				data: [],
				label: "Sensor 4",
				borderColor: "#b28f3e",
				fill: false
			}, {
				data: [],
				label: "Sensor 5",
				borderColor: "#d5d81e",
				fill: false
			}, {
				data: [],
				label: "Sensor 6",
				borderColor: "#4cd81e",
				fill: false
			}, {
				data: [],
				label: "Sensor 7",
				borderColor: "#1ed8bc",
				fill: false
			}, {
				data: [],
				label: "Sensor 8",
				borderColor: "#1e81d8",
				fill: false
			}, {
				data: [],
				label: "Sensor 9",
				borderColor: "#624f8e",
				fill: false
			}, {
				data: [],
				label: "Sensor 10",
				borderColor: "#bc38a0",
				fill: false
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Humedad'
			},
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						//unit: 'day',
						minUnit: 'minute',
						displayFormats: {
							day: 'D MMM',
							hour: 'D MMM hA'
						}
					}
				}],
				yAxes: [{
					type: 'linear',
					ticks: {
						suggestedMin: 5.0,
						suggestedMax: 60.0
					}
				}]		
			}
		}
	});
}

function create_chart_temp(){

	temp_chart = new Chart(document.getElementById("TChart"), {
		type: 'line',
		data: {
		//labels: ['2:13:22', '2:13:30', '2:15:00', '2:16:30'],
		//labels: [1, 2, 3, 4],
			labels: [],
			datasets: [{
				data: [],
				label: "Sensor 1",
				borderColor: "#cc3030",
				fill: false
			}, {
				data: [],
				label: "Sensor 2",
				borderColor: "#cc5730",
				fill: false
			}, {
				data: [],
				label: "Sensor 3",
				borderColor: "#894709",
				fill: false
			}, {
				data: [],
				label: "Sensor 4",
				borderColor: "#b28f3e",
				fill: false
			}, {
				data: [],
				label: "Sensor 5",
				borderColor: "#d5d81e",
				fill: false
			}, {
				data: [],
				label: "Sensor 6",
				borderColor: "#4cd81e",
				fill: false
			}, {
				data: [],
				label: "Sensor 7",
				borderColor: "#1ed8bc",
				fill: false
			}, {
				data: [],
				label: "Sensor 8",
				borderColor: "#1e81d8",
				fill: false
			}, {
				data: [],
				label: "Sensor 9",
				borderColor: "#624f8e",
				fill: false
			}, {
				data: [],
				label: "Sensor 10",
				borderColor: "#bc38a0",
				fill: false
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Humedad'
			},
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						//unit: 'day',
						minUnit: 'minute',
						displayFormats: {
							day: 'D MMM',
							hour: 'D MMM hA'
						}
					}
				}],
				yAxes: [{
					type: 'linear',
					ticks: {
						suggestedMin: 0,
						suggestedMax: 50.0
					}
				}]		
			}
		}
	});
}

function create_chart_bat(){

	bat_chart = new Chart(document.getElementById("BChart"), {
		type: 'line',
		data: {
		//labels: ['2:13:22', '2:13:30', '2:15:00', '2:16:30'],
		//labels: [1, 2, 3, 4],
			labels: [],
			datasets: [{
				data: [],
				label: "Sensor 1",
				borderColor: "#cc3030",
				fill: false
			}, {
				data: [],
				label: "Sensor 2",
				borderColor: "#cc5730",
				fill: false
			}, {
				data: [],
				label: "Sensor 3",
				borderColor: "#894709",
				fill: false
			}, {
				data: [],
				label: "Sensor 4",
				borderColor: "#b28f3e",
				fill: false
			}, {
				data: [],
				label: "Sensor 5",
				borderColor: "#d5d81e",
				fill: false
			}, {
				data: [],
				label: "Sensor 6",
				borderColor: "#4cd81e",
				fill: false
			}, {
				data: [],
				label: "Sensor 7",
				borderColor: "#1ed8bc",
				fill: false
			}, {
				data: [],
				label: "Sensor 8",
				borderColor: "#1e81d8",
				fill: false
			}, {
				data: [],
				label: "Sensor 9",
				borderColor: "#624f8e",
				fill: false
			}, {
				data: [],
				label: "Sensor 10",
				borderColor: "#bc38a0",
				fill: false
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Humedad'
			},
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						//unit: 'day',
						minUnit: 'minute',
						displayFormats: {
							day: 'D MMM',
							hour: 'D MMM hA'
						}
					}
				}],
				yAxes: [{
					type: 'linear',
					ticks: {
						suggestedMin: -2.0,
						suggestedMax: 5.0
					}
				}]		
			}
		}
	});
}
// --------------------------------------------------------

/*
function getData() {
	var dataxy = [];
	for (var i = 0; i < Yaxis1.length; i++) {
		dataxy.push(Yaxis[i]);
	}
	console.log("Truco: ");
	console.log(dataxy);
	return dataxy;
}
*/

function addData(chart, label, data, num) {
	// Agregar nuevos datos a la gráfica
	// chart -> Nombre de la gráfica
	// label -> Valor del eje x
	// data -> Valor del eje y
	// num -> número del dataset donde se inserta el dato (corresponde al número de sensor)
    /*
	if (num == 0) {
		chart.data.labels.push(label);
	}
	*/
	var nuevo_dato = {x: label, y: data};		
    //chart.data.datasets.forEach((dataset) => {
        //dataset.data.push(data);
    //});
	chart.data.datasets[num].data.push(nuevo_dato);
    chart.update();
}
//*
function updateDatasets(chart) {
	// Modificar número de datos de la gráfica
	// chart -> Nombre de la gráfica
	var difference = quantity - last_quantity;
	for (var i = 0 ; i < full_data.length; i++) {		
		if (difference < 0) {
			if (full_data[i].length > quantity) {
				if (full_data[i].length > last_quantity) {
					var vals_to_remove = Math.abs(difference);
				} else { 
					var vals_to_remove = full_data[i].length - quantity;
				}
				for (var j = 0 ; j < vals_to_remove; j++) {
					chart.data.datasets[i].data.shift();
					//console.log(chart.data.datasets[i].data);
				}
			}
		} else {
			if (full_data[i].length > last_quantity) {
				if (full_data[i].length > quantity) {
					var vals_to_add = difference;
				} else { 
					var vals_to_add = full_data[i].length - last_quantity;
				}
				for (var j = full_data[i].length - last_quantity - 1; j >= full_data[i].length - last_quantity - vals_to_add; j--) {					
					var date_moment = moment(full_data[i][j][0] + "" + full_data[i][j][1],"M/D/YY h:m:s");
					if (chart == hum_chart) {
						var num = 3;
					} else if (chart == temp_chart) {
						var num = 4;
					} else {
						var num = 5;
					}					
					var nuevo_dato = {x: date_moment, y: Number(full_data[i][j][num])};
					chart.data.datasets[i].data.unshift(nuevo_dato);
					//console.log(chart.data.datasets[i].data);
				}
			}
		}
	}
    chart.update();
}
//*/
/*
function update(chart){
	chart.update();
}
//console.log(cont);
*/
//*
var $periodo = $('#periodo');

$periodo.change(function() {
	last_quantity = quantity;
	switch ($periodo.val()){
		case "24 horas":
			quantity = quantity1;
			break;
		case "3 días":
			quantity = quantity2;
			break;
		case "7 días":
			quantity = quantity3;
			break;
		default:
			quantity = quantity3;
			break;
	}
	//document.getElementById('target').innerHTML = "Se va a usar: " + quantity + "<br>" + "Las lecturas son: " + q1+q2+q3+q4+q5+q6+q7+q8+q9+q10 + "antiguo: " + last_quantity;
	updateDatasets(hum_chart);
	updateDatasets(temp_chart);
}).trigger('change'); // added trigger to calculate initial state
//	*/


// GENERACIÓN DE PDF
/* Logos en formato Base64 */
var logo_s = "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";

var logo_l = "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";

var button = document.getElementById("reporte");

button.addEventListener('click', printPDF);

function printPDF() {
	var pdf = new jsPDF();
	//var logo_s = 'data:image/jpeg;base64,'+ Base64.encode('\img\logo_shield.png');
	//var logo_s = btoa('\img\logo_shield.png');
	pdf.addImage(logo_s,'PNG',10,5);
	pdf.addImage(logo_l,'PNG',100,5);
	var line = 40;		// Valor inicial de línea en eje y
	pdf.setFontSize(20);
	pdf.text('Reporte de datos de humedad y temperatura',10,line);
	line += 10;
	for (i=0; i<hum_chart.data.datasets.length; i++){
		pdf.setFontSize(16);
		pdf.text('Área ' + (i+1),10,line);
		line += 5;
		pdf.setFontSize(12);
		for (j=0; j<hum_chart.data.datasets[i].data.length; j++){
			pdf.text(hum_chart.data.datasets[i].data[j]['x'].format("D MMM YY h:mm a") +
			', Humedad: ' + hum_chart.data.datasets[i].data[j]['y'] +' %' + ', Temperatura: ' + temp_chart.data.datasets[i].data[j]['y'] +' °C',10,line);
			if (line >= 280){
				pdf.addPage();
				line = 15;
			}
			line += 5;
		}
		line += 5;		
	}
	
	//pdf.text('El valor que usted pagará es ' + doom.data.datasets[3].data[0]['x'],10,10);
	//pdf.text('El valor que usted pagará es ' + doom.data.datasets[3].data[1]['y'],10,15);
	if (pdf.output('dataurlnewwindow')){
		console.log('test');
		console.log(pdf.getFontSize());
	}
}


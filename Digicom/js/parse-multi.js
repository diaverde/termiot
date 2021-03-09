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
create_chart_bat();

// JQuery test
/*
jQuery.get("datatest.csv", {}, function(data){
	alert(data);
	}, "text").fail(function (jqXHR, textStatus, errorThrown) {
    alert("AJAX call failed: " + textStatus + ", " + errorThrown);
});
// JQuery read of the csv files
*/
jQuery.get("data1.csv", undefined, process_data, "text");
jQuery.get("data2.csv", undefined, process_data, "text");
jQuery.get("data3.csv", undefined, process_data, "text");
jQuery.get("data4.csv", undefined, process_data, "text");
jQuery.get("data5.csv", undefined, process_data, "text");
jQuery.get("data6.csv", undefined, process_data, "text");
//*/
///*
jQuery.get("data7.csv", undefined, process_data, "text");
jQuery.get("data8.csv", undefined, process_data, "text");
jQuery.get("data9.csv", undefined, process_data, "text");
jQuery.get("data10.csv", undefined, process_data, "text");
//*/

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
			addData(bat_chart,date_moment,Number(temp[5]),bicho);
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
	updateDatasets(bat_chart);
}).trigger('change'); // added trigger to calculate initial state
//	*/

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
	

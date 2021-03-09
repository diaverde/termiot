var Xaxis = [];
var Yaxis1_1 = [];
var Yaxis1_2 = [];
var Yaxis1_3 = [];
var Yaxis2_1 = [];
var Yaxis2_2 = [];
var Yaxis2_3 = [];
var fool = [23, 25, 33.3, 44.1];
var dark;

create_chart_hum();
create_chart_temp();
create_chart_bat();

jQuery.get("datatest.csv", {}, function(data){
	alert(data);
	}, "text").fail(function (jqXHR, textStatus, errorThrown) {
    alert("AJAX call failed: " + textStatus + ", " + errorThrown);
});
jQuery.get("data1.csv", undefined, process_data1, "text");
jQuery.get("data2.csv", undefined, process_data2, "text");

function process_data1(data) {
	var cont = data;
	console.log(cont);
	fun = cont.split(',');
	fun2 = cont.split('\n');
	fun2.pop();				// delete last element which is empty
	console.log(fun2);
	for (var i = 0; i < fun2.length; i++) {
		temp = fun2[i].split(',');
		console.log(temp);
		var date_moment = moment(temp[0] + "" + temp[1],"M/D/YY h:m:s");
		//Xaxis.push(date_moment);
		//Yaxis1_1.push(Number(temp[3]));
		addData(hum_chart,date_moment,Number(temp[3]),0);
		//Yaxis1_2.push(Number(temp[4]));
		addData(temp_chart,date_moment,Number(temp[4]),0);
		//Yaxis1_3.push(Number(temp[5]));
		addData(bat_chart,date_moment,Number(temp[5]),0);
	}
	console.log(Xaxis);
	console.log(Yaxis1_1);	
}

function process_data2(data) {
	var cont = data;
	fun = cont.split(',');
	fun2 = cont.split('\n');
	fun2.pop();				// delete last element which is empty
	for (var i = 0; i < fun2.length; i++) {
		temp = fun2[i].split(',');
		var date_moment = moment(temp[0] + "" + temp[1],"M/D/YY h:m:s");
		//Xaxis.push(date_moment);
		//Yaxis2_1.push(Number(temp[3]));
		addData(hum_chart,date_moment,Number(temp[3]),1);
		//Yaxis2_2.push(Number(temp[4]));
		addData(temp_chart,date_moment,Number(temp[4]),1);
		//Yaxis2_3.push(Number(temp[5]));
		addData(bat_chart,date_moment,Number(temp[5]),1);
	}
}


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
				borderColor: "#3e95cd",
				fill: false
			}, {
				data: [],
				label: "Sensor 2",
				borderColor: "#3e951d",
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
						unit: 'day',
						round: 'day',
						displayFormats: {
							second: 'h:mm:ss a'
						}
					}
				}],
				yAxes: [{
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
				borderColor: "#3e95cd",
				fill: false
			}, {
				data: [],
				label: "Sensor 2",
				borderColor: "#3e951d",
				fill: false
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Temperatura'
			},
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						unit: 'day',
						round: 'day',
						displayFormats: {
							second: 'h:mm:ss a'
						}
					}
				}],
				yAxes: [{
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
				borderColor: "#3e95cd",
				fill: false
			}, {
				data: [],
				label: "Sensor 2",
				borderColor: "#3e951d",
				fill: false
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Nivel de batería'
			},
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						unit: 'day',
						round: 'day',
						displayFormats: {
							second: 'h:mm:ss a'
						}
					}
				}],
				yAxes: [{
					ticks: {
						suggestedMin: -2.0,
						suggestedMax: 5.0
					}
				}]		
			}
		}
	});

}

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
    if (num == 0) {
		chart.data.labels.push(label);
	}
    //chart.data.datasets.forEach((dataset) => {
        //dataset.data.push(data);
    //});
	chart.data.datasets[num].data.push(data);
    chart.update();
}

/*
function update(chart){
	chart.update();
}
//console.log(cont);
*/
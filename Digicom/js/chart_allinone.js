/*
new Chart(document.getElementById("TChart"), {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: [
			{x: 1500, y: 86},
			{x: 1800, y: 107},
			{x: 2050, y: 2478}
		],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: [
			{x: 1500, y: 100},
			{x: 1800, y: 107},
			{x: 2050, y: 2000}
		],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false
      }, { 
        data: [
			{x: 1500, y: 60},
			{x: 1800, y: 207},
			{x: 2050, y: 2780}
		],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false
      }, { 
        data: [
			{x: 1500, y: 15},
			{x: 1800, y: 97},
			{x: 2050, y: 1478}
		],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false
      }, { 
        data: [
			{x: 1500, y: 65},
			{x: 1800, y: 107},
			{x: 2050, y: 2978}
		],
        label: "North America",
        borderColor: "#c45850",
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
*/
var doom = new Chart(document.getElementById("TChart"), {
  type: 'line',
  data: {    
    datasets: [{ 
        data: [
			{x: 1500, y: 86},
			{x: 1600, y: 200},
			{x: 1800, y: 507},
			{x: 2050, y: 2478}
		],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: [
			{x: 1500, y: 100},
			{x: 1700, y: 500},
			{x: 1800, y: 1007},
			{x: 2050, y: 2000}
		],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false
      }, { 
        data: [
			{x: 1500, y: 60},
			{x: 1800, y: 207},
			{x: 2050, y: 2780}
		],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false
      }, { 
        data: [
			{x: 1500, y: 15},
			{x: 2050, y: 1478}
		],		
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false
      }, { 
        data: [
			{x: 1500, y: 65},
			{x: 1800, y: 107},
			{x: 2050, y: 2978}
		],
        label: "North America",
        borderColor: "#c45850",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    },
	scales: {
		xAxes: [{
			type: 'linear'
//			ticks: {
	//			suggestedMin: 1500,
		//		suggestedMax: 2100
			//}
		}],
		yAxes: [{
			//type: 'linear',
			ticks: {
				suggestedMin: 5.0,
				suggestedMax: 60.0
			}
		}]
	}

  }
});

/*
console.log(doom.data.datasets[3].data);
var datum = {x: 2200, y: 3000};
doom.data.datasets[3].data.push(datum);
doom.update();
console.log(doom.data.datasets[3].data);
doom.data.datasets[3].data.sort(function(a, b){return a.x - b.x});
console.log(doom.data.datasets[3].data);
*/
console.log(doom.data.datasets[3].data[0]['x']);
console.log(doom.data.datasets.length);
console.log(doom.data.datasets[3].data.length);

var button = document.getElementById("go");

button.addEventListener('click', printPDF);

function printPDF() {
	var pdf = new jsPDF();
	var line = 10;		// Valor inicial de línea en eje y
	for (i=0; i<doom.data.datasets.length; i++){
		pdf.text('Área ' + (i+1),10,line);
		line += 5;
		for (j=0; j<doom.data.datasets[i].data.length; j++){
			pdf.text('Año: ' + doom.data.datasets[i].data[j]['x'] + ', Población: ' + doom.data.datasets[i].data[j]['y'],10,line);
			line += 5;
		}
		line += 5;
	}
	
	//pdf.text('El valor que usted pagará es ' + doom.data.datasets[3].data[0]['x'],10,10);
	//pdf.text('El valor que usted pagará es ' + doom.data.datasets[3].data[1]['y'],10,15);
	if (pdf.output('dataurlnewwindow')){
		console.log('test');
		console.log(input.value);
	}
}
	

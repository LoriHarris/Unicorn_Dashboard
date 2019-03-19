function buildMetadata(sample) {
  
  
  d3.json(`/metadata/${sample}`).then(function(data) {
    var data = [data];
    console.log(data);
  var meta_chart = d3.select("#sample-metadata");
  meta_chart.html("");
  data.forEach((data) => {
    var row1 = meta_chart.append("table-responsive");
    var row = row1.append("tbody");
    Object.entries(data).forEach(([key, value]) => {
      var cell = row.append("tr");
      
      cell.text(`${key}: ${value}`);
      
    console.log(`Key: ${key} | Value: ${value}`);
    });
  });
});
  d3.json(`/metadata/${sample}`).then(function(data) {
      var WFREQ = (data.WFREQ*20)
      
      console.log(WFREQ)
      var traceA = [{ type: 'scatter',
      x: [0], y:[0],
       marker: {size: 20, color:'black'},
       showlegend: false,
       name: `Scrubs per week = ${WFREQ / 20}`,
      //  text: data.WFREQ,
       hoverinfo: 'text+name'},
        {
        
        type: 'pie',
        hole: .5,
        rotation: 90,
        values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 /9, 100 / 9, 100 / 9, 100 / 9, 100 ],
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
        direction: "clockwise",
        textinfo: "text",
        name: `Scrubs per week = ${WFREQ / 20}`,

        textposition: "inside",
        marker: { colors: ["rgb(51, 102, 0)", "rgb(102, 102, 0)", "rgb(76, 153, 0)", "rgb(153, 153, 0)", "rgb(102, 204, 0)", 
        "rgb(204, 204, 0)", "rgb(128, 255, 0)", "rgb(255, 255, 0)", "rgb(153, 255, 0)", "white"]},
          
       
        hoverinfo: 'name'
    
      }];
      
      var degrees = 180- WFREQ;
      console.log(degrees)
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);
var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
// Path: may have to change to create a better triangle
var mainPath = path1,
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
 
      var layout = {
        title: {
          text:'Scrub Frequency',
          font: {
            family: 'Creepster, cursive',
            size: 24
          },
        },
        showlegend: false,
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: 'black',
            line: {
              color: 'black'
            }
          }],
       
        // height:325,
        // width: 360,
        autosize: true,
        xaxis: {zeroline:false, showticklabels:false,
                   showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                   showgrid: false, range: [-1, 1]}
      };
      
      Plotly.newPlot("gauge", traceA, layout, {responsive: true});
        

    });
   

}

function buildCharts(sample) {
  d3.json(`/samples/${sample}`).then(function(data) {
    var samples1 = data.sample_values;
    var otu_ids1 = data.otu_ids;
    var labels1 = data.otu_labels;
      var array = []
  for (var j = 0; j < otu_ids1.length; j++) {
    array.push({'samples1': samples1[j], 'otu_ids1': otu_ids1[j], 'labels1': labels1[j]}
  )};
 var sorted = array.sort(function(a, b) {
    return ((a.samples1>b.samples1) ? -1 :((a.samples1==b.samples1)? 0:1));
  });
  for (var k = 0; k<array.length;k++){
    samples1[k]=array[k].samples1;
    otu_ids1[k]=array[k].otu_ids1;
    labels1[k]=array[k].labels1;
  }
  labels = labels1.slice(0,10)
  samples = samples1.slice(0,10)
  otu_ids=otu_ids1.slice(0,10)
 
    var data = [{
    values: samples,
    labels: labels,
    name: `Sample#${ sample}`,
    hoverinfo: 'label+percent+name',
    // text: labels,
    // marker: { colors: [ otu_ids]}
    marker: { colors: [ "rgb(51, 102, 0)", "rgb(102, 102, 0)", "rgb(76, 153, 0)", "rgb(153, 153, 0)", "rgb(102, 204, 0)", 
    "rgb(204, 204, 0)", "rgb(128, 255, 0)", "rgb(255, 255, 0)", "rgb(153, 255, 0)", "rgb(255, 255, 51)"]},

    type: 'pie'
  }];
  
  var layout = {
   
    title: {
      text:'Top 10 Bacteria',
      font: {
        family: 'Creepster, cursive',
        size: 24
      },
    }, 
    showlegend: false,
    // height: 325,
    // width: 360,
    autosize: true,
  };
 
// Plot the chart to a div tag with id "plot"
Plotly.newPlot("pie", data, layout, {responsive: true});




d3.json(`/samples/${sample}`).then(function(data) {
  var samples1 = data.sample_values;
  var otu_ids1 = data.otu_ids;
  var labels1 = data.otu_labels;
  var array = []
  for (var j = 0; j < otu_ids1.length; j++) {
    array.push({'samples1': samples1[j], 'otu_ids1': otu_ids1[j], 'labels1': labels1[j]}
  )};
 var sorted = array.sort(function(a, b) {
    // return parseFloat(b.samples1) - parseFloat(a.samples1);
    return ((a.samples1>b.samples1) ? -1 :((a.samples1==b.samples1)? 0:1));
  });
  for (var k = 0; k<array.length;k++){
    samples1[k]=array[k].samples1;
    otu_ids1[k]=array[k].otu_ids1;
    labels1[k]=array[k].labels1;
  }
  labels = labels1.slice(0,10)
  samples = samples1.slice(0,10)
  otu_ids=otu_ids1.slice(0,10)
  console.log(samples)


    var data1 = [{
      x: otu_ids,
      y: samples,
      text: labels,
      mode: 'markers',
      marker: {
        // color: otu_ids,
        color: [ "rgb(51, 102, 0)", "rgb(102, 102, 0)", "rgb(76, 153, 0)", "rgb(153, 153, 0)", "rgb(102, 204, 0)", 
        "rgb(204, 204, 0)", "rgb(128, 255, 0)", "rgb(255, 255, 0)", "rgb(153, 255, 0)", "rgb(255, 255, 51)"],
        size: samples,
        
      }

    }];

    var layout = {
      title: {
        text:'Sample Values',
        font: {
          family: 'Creepster, cursive',
          size: 24
        },
      },
      showlegend: false,
      // height: (Math.max(samples+100)),
      // width: 1200, 
       xaxis: {
        title: {
          text: 'Bacteria ID',
          font: {
            family: 'Creepster, cursive',
            size: 18,
            color: '#7f7f7f'
          },
        },
      },
      yaxis: {
        title: {
          text: 'Samples',
          font: {
            family: 'Creepster, cursive',
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    };
    
    Plotly.newPlot('bubble', data1, layout, {responsive: true});
  });  
 
  });
}

 

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

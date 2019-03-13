function buildMetadata(sample) {
  
  
  d3.json(`/metadata/${sample}`).then(function(data) {
    var data = [data];
    console.log(data);
  var meta_chart = d3.select("#sample-metadata");
  meta_chart.html("");
  data.forEach((data) => {
    var row = meta_chart.append("tbody");
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
       name: 'speed',
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
        textposition: "inside",
        marker: { colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "white"]},
          
       
        hoverinfo: "label"
    
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
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: 'black',
            line: {
              color: 'black'
            }
          }],
        title: 'Scrub Frequency',
       
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
                   showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                   showgrid: false, range: [-1, 1]}
      };
      
      Plotly.newPlot("gauge", traceA, layout, {staticPlot: true});
        

    });
   

}
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {
  d3.json(`/samples/${sample}`).then(function(data) {
  var data = [{
    values: data.sample_values.slice(0,10),
    labels: data.otu_ids.slice(0,10),
    hoverinfo: 'text+percent+name',
    text: data.otu_labels.slice(0,10),
    type: 'pie'
  }];
  
  var layout = {
    height: 425,
    width: 425
  };
 
// Plot the chart to a div tag with id "plot"
Plotly.newPlot("pie", data, layout);




d3.json(`/samples/${sample}`).then(function(data) {
  console.log(data.sample_values)
    var data1 = [{
      x: data.otu_ids.slice(0,10),
      y: data.sample_values.slice(0,10),
      mode: 'markers',
      marker: {
     
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)' ],
        opacity: [1, 0.8, 0.6, 0.4,1, 0.8, 0.6, 0.4, .6, .8 ],
        size: [40, 45, 50, 55, 60, 65, 70, 75, 80, 100]
      }

    }];

    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 1400
    };
    
    Plotly.newPlot('bubble', data1, layout);
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

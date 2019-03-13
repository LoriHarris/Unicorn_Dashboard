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

}
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {
  d3.json(`/samples/${sample}`).then(function(data) {
    var data = [data];
    console.log(data);
    var key1 = Object.values(data);
    console.log(key1);
  // Object.entries(data).forEach(([key,value]) => {
  //   console.log(key, value);
  key1.forEach((item) => {
    var values1 = Object.values(key1);
    console.log(values1)
  var pie_data = [{
    values: [values1[0], values1[1], values1[2]],
    labels: ["ID", "Other", "Sample Type"],
    type: 'pie'
  }];
  var layout = {
    height: 400,
    width:500
  };
  Plotly.newPlot("pie", pie_data, layout);

  });
  });

}
//   var row = meta_chart.append("tbody");
  //   Object.entries(data).forEach(([key, value]) => {
  //     var cell = row.append("tr");
      
  //     cell.text(`${key}: ${value}`);
      
  //   console.log(`Key: ${key} | Value: ${value}`);
 
    // });
    
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
 

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

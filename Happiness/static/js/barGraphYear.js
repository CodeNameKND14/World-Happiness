// Bar Graph displaying the happiness score by year 

function barGraph(year) { 
  // Used `d3.json` to fetch the sample data for the plots
  //Use the list of sample names to populate the select options
  d3.json(`/happinessYear/${year}`).then((data) => {

    var country = data.country 
    var  happiness_score = data.happiness_score
    console.log(data)
    //*******************************************************//
    //  Bar Chart by country: happiness_score
    //*******************************************************//
    
    var traceScore= {
      x: country,
      y: happiness_score, 
      text: country, 
      name: "Happiness_Score",
      type: "bar",
      marker: {
        color: '#20a382',
        opacity: 0.75
      }
    };

    var dataScore = [traceScore];

    var layoutScore = {
      title: `Happiness Score by Country: ${year}: `,
        barmode: "group",
        autosize: true,
        height:500,
        width:790,
        color: '#20a382',
        yaxis:{ 
          title: "Happiness Score"

        },
   
        xaxis: {
          tickangle: 45
        },

        };
        
        // Render the plot to the div tag with id "happinessBarYear"
        Plotly.newPlot("happinessBarYear", dataScore, layoutScore, {responsive: true});
});

};

function init() {   
  // Grabbed a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Used the list of sample names to populate the select options
  d3.json("/year").then((sampleYear) => {
    sampleYear.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    console.log(sampleYear)
    // Use the first sample from the list to build the default/initial plots
    var firstSample = sampleYear[0];
    console.log(firstSample)
    barGraph(firstSample);
  });
};

function optionChanged(year) {
  // Fetch new data each time a new sample is selected
  console.log("This is new data", year); 
  
  // builds the charts
  barGraph(year); 
}

init();
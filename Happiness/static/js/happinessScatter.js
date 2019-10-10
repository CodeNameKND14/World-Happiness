//*******************************************************//
// Build function for Scatter Plot chart
//*******************************************************//
function buildComparison(year4){
    dat = new Date()
    console.log("buildComparison", dat.getTime())
    remove_graphs()

    // populate the select option with the list of years
    d3.json(`/happinessScatter/${year4}`).then((data) => {
        console.log("Comparison Button", data)
        var years = data.year
        var happiness_score = data.happiness_score
        var economy_gdp_per_capita = data.economy_gdp_per_capita
        var family = data.family
        var health_life_expectancy = data.health_life_expectancy
        var freedom = data.freedom
        var generosity = data.generosity
        var trust_government_corruption = data.trust_government_corruption

        // create gdp comparison
        var traceS1 = {
        x: economy_gdp_per_capita, 
        y: happiness_score, 
        mode: "markers",
        type: "scatter",
        name: "Economy GDP",
        marker: {
          color: "green",
          symbol: "star-triangle-up"
          }
        };

        //create generosity comparison
        var traceS2 = {
        x: generosity, 
        y: happiness_score,
        mode: "markers",
        type: "scatter",
        name: "Generosity",
        marker: {
          color: "rgb(102,194,165)",
          symbol: "cross"
          }
        };

        // create family comparison 
        var traceS3 = {
        x: family, 
        y: happiness_score, 
        mode: "markers",
        type: "scatter",
        name: "Family",
        marker: {
          color: "blue",
          symbol: "cross"
          }
        };
      
        // create health comparison 
        var traceS4 = {
        x: health_life_expectancy,
        y: happiness_score,  
        mode: "markers",
        type: "scatter",
        name: "Life Expectancy",
        marker: {
          color: "orange",
          symbol: "#"
          }
        };

        // create trust comparison
        var traceS5 = {
        x: trust_government_corruption,
        y: happiness_score, 
        mode: "markers",
        type: "scatter",
        name: "Goverment Trust",
        marker: {
          color: "red",
          symbol: "diamond-x"
          }
        };

      // create freedom comparison 
        var traceS6 = { 
        x: freedom,
        y: happiness_score, 
        mode: "markers",
        type: "scatter",
        name: "Freedom",
        marker: {
          color: "rgba(156, 165, 196, 1.0)",
          symbol: "cross"
          }
        };
      
      // create the data array for the plot
      var dataS = [traceS1, traceS2, traceS3, traceS4, traceS5, traceS6];
     
      // check data in console 
      console.log("DATA S", dataS)
      
      // Define the plot layout
      var layoutS = {
      title: "Happiness Score",
      legend: {"orientation": "h"} , 
      yaxis: { title: "Happiness Scale (1-10)"
      },
      autosize: true,
      height:500,
      width:870
        
      };
      
      // Plot the chart to a div tag with id "scatterHappiness"
      Plotly.newPlot("scatterHappiness", dataS, layoutS, {responsive: true});

    });
  }


// Remove graph upon changes 
function remove_graphs(){
    d3.selectAll("#scatterHappiness > *").html("")

}

//**********************************************************//
// Global Function to initialize graphs
//**********************************************************//
function init(){
  // Grabbed a reference to the dropdown select element
  var selector = d3.select("#selDataSetScatter");

 // Used the list of sample year to populate the select options
  d3.json("/year").then((sampleYear) => {
    sampleYear.forEach((sample) => {
      selector
      .append("option")
      .text(sample)
      .property("value", sample);
   });

   // check list in console
   console.log("SAMPLE Year", sampleYear)

   // Use the first sample from the list to build the default/initial plots
   var firstSample = sampleYear[0];
   
   buildComparison(firstSample);
 });
}
function scatterChanged(year4) {
  // Fetch new data each time a new sample is selected
  console.log("This is new data", year4); 
  // builds the charts
  buildComparison(year4);
  
 
 }

init();
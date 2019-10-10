// Change logic so it brings in a region not yeaR!
function barGraphRegion(year){
    // Region Bar
    d3.json(`/happinessRegion/${year}`).then((data) =>{
        var years = data.year
        var country = data.country 
        var happiness_rank = data.happiness_rank
        var happiness_score = data.happiness_score
        var region = data.region
        var population = data. population
        console.log("data------")
        console.log(data)  
    
      //*******************************************************//
      //  Bar Chart by country: happiness_score
      //*******************************************************//
      var traceRegion= {
      x: region,
      y: happiness_score, 
      text: region, 
      name: "Happiness_Score",
      type: "bar"
      };
  
      var dataRegion = [traceRegion];
  
      var layoutRegion = {
        title: `Year of ${year}: Happiness Scoreboard by Region`,
        barmode: "group",
        autosize: true,
        height:500,
        width:800,
        color: 'rgb(107, 107, 107)'
  
        };
  
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("happinessBarRegion", dataRegion, layoutRegion);
  
    });
  
  }

function init() {
    
    // Grabbed a reference to the dropdown select element
 var selector = d3.select("#selDataSetRegion");
 // Used the list of sample names to populate the select options
 d3.json("/year2").then((sampleCountry) => {
   sampleCountry.forEach((sample) => {
     selector
       .append("option")
       .text(sample)
       .property("value", sample);
   });
   console.log("SAMPLE COUNTRY", sampleCountry)
   // Use the first sample from the list to build the default/initial plots
   var firstSample = sampleCountry[0];
   console.log(firstSample)
   barGraphRegion(firstSample);
 });
};

function regionChanged(year) {
 // Fetch new data each time a new sample is selected
    console.log("This is new data", year); // logs every change
    barGraphRegion(year); // builds the charts
 //buildMetadata(newSample); // inserts the metadata into the #sample-metadata class

}
init();
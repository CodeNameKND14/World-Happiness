// Bar Graph by Region 
function barGraphRegion(year2){
    // Region Bar
    d3.json(`/happinessRegion/${year2}`).then((data) =>{

        var avg_happiness_score = data.avg_happiness_score;
        var region = data.region;
        var population = data.population;

        // check data by printing to console
        console.log("----Region DATA------")
        console.log(data)  
    
      //*******************************************************//
      //  Bar Chart by country: Avg happiness score v. Region
      //*******************************************************//
      
      var traceRegion= {
      x: region,
      y: avg_happiness_score, 
      name: "Happiness_Score",
      type: "bar",
      //hovermode:false,
      marker: {
        color: '#359696',
        opacity: 0.75
      } 

      };
  
      var dataRegion = [traceRegion];
  
      var layoutRegion = {
        title: `Average of Happiness Score by Region: ${year2}`,
        barmode: "group",
        autosize: true,
        height:450,
        width:500,
        color: '#359696',
        yaxis: { 
            title: "Average of Happiness Score",
            tickvals:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        }
  
        };
  
      // Render the plot to the html div tag with id "happinessBarRegion"
      Plotly.newPlot("happinessBarRegion", dataRegion, layoutRegion, {responsive: true});

       //*******************************************************//
      //  Bar Chart by country: total population v. Region
      //*******************************************************//
      
      var tracePop= {
        x: region,
        y: population, 
        text: region, 
        name: "Happiness_Score",
        type: "bar",
        marker: {
            color: '#20a382',
            opacity: 0.75
          }
        };
    
        var dataPop = [tracePop];
    
        var layoutPop = {
          title: `Population by Region: ${year2}`,
          barmode: "group",
          autosize: true,
          height:450,
          width:500,
          color: 'rgb(107, 107, 107)',
          yaxis: { 
            title: "Population"

        }
    
          };
    
        // Render the plot to the html div tag with id "happinessBarPopulation"
        Plotly.newPlot("happinessBarPopulation", dataPop, layoutPop, {responsive: true});
    
  
    });
  
  }

function init() {
    
    // Grabbed a reference to the dropdown select element
    var selector = d3.select("#selDataSetRegion");
    // Used the list of sample names to populate the select options
    d3.json("/year").then((sampleYear) => {
        sampleYear.forEach((sample) => {
        selector
       .append("option")
       .text(sample)
       .property("value", sample);
   });

   // Check to see if the year appears in the console
   console.log("YEAR:", sampleYear)
   // Use the first sample from the list to build the default/initial plots
   var firstSample = sampleYear[0];
   // Check to see if the year appears in the console
   console.log(firstSample)
   barGraphRegion(firstSample);
 });
};

function regionChanged(year2) {
    // Fetch new data each time a new year is selected
    console.log("This is new data", year2); 
    // builds the new chart 
    barGraphRegion(year2); 

}
init();
//*******************************************************************************************************************************//
// Line_Graph: Build Chart for "Overview" Button--------DONE Teresa
//*******************************************************************************************************************************//
// function line_graph(sample) {
//   // Used `d3.json` to fetch the sample data for the plots
//   d3.json(`/line_graph/${sample}`).then((data) => {
    
//     var years = data.year
//     var country = data.country 
//     var country_code = data.country_code
//     var happiness_rank = data.happiness_rank
//     var  happiness_score = parseInt(data.happiness_score)
//     var population = data.population
//     var tScore = parseInt(happiness_score) * 1000000

//     console.log([tScore,tScore,tScore])
//     console.log(population)
//     console.log(years)
//     // Define trace for the population line graph with AUT as the placeholder
//     var pop_trace = {
//       x: years,
//       y: population,
//       type: 'scatter',
//       name: 'Population',
//       line: {
//           color: '#237BB8',
//           width: 2
//       }
//       };
    
//     var happiness_score_trace = {
//       x: years,
//       y: [tScore,tScore,tScore] ,
//       type: 'scatter',
//       name: 'happiness score',
//       line: {
//           color: '#23B8B1',
//           width: 2
//       }
//     };
//     // Define layout for the line graph
//     var layout = {
//       title:'Population vs. Happiness_Rank',
//       yaxis: {range: [0, 9000000]},
//       xaxis:{
//         tickmode: "array",
//         tickvals:[2015, 2016, 2017],
//         ticktext: [2015, 2016, 2017]

//       }

//   };
//   // Define the full trace for line graph
//   var full_trace = [pop_trace, happiness_score_trace];

//   // Plot the line graph
//   Plotly.newPlot('line', full_trace, layout);

//   })
// };
function barGraph(year) {

  
  // Used `d3.json` to fetch the sample data for the plots

   //Use the list of sample names to populate the select options
  d3.json(`/happinessYear/${year}`).then((data) => {
    var years = data.year
    var country = data.country 
    var happiness_rank = data.happiness_rank
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
      type: "bar"
    };

    var dataScore = [traceScore];

    var layoutScore = {
        title: `Year of ${year}: Happiness Scoreboard by Country`,
        barmode: "group",
        autosize: true,
        height:500,
        width:800,
        color: 'rgb(107, 107, 107)'

        };
        
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("happinessBarYear", dataScore, layoutScore);
})
}

function init() {
    
     // Grabbed a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Used the list of sample names to populate the select options
  d3.json("/year").then((sampleCountry) => {
    sampleCountry.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    console.log(sampleCountry)
    // Use the first sample from the list to build the default/initial plots
    var firstSample = sampleCountry[0];
    console.log(firstSample)
    barGraph(firstSample);
  });
};

function optionChanged(year) {
  // Fetch new data each time a new sample is selected
  console.log("This is new data", year); // logs every change
  barGraph(year); // builds the charts
  //buildMetadata(newSample); // inserts the metadata into the #sample-metadata class

}







//*******************************************************************************************************************************//
// CHART: Build Chart for "Overview" Button--------DONE Teresa
//*******************************************************************************************************************************//
// function buildOverview(metaDatabyYear){
//     dat = new Date()
//     console.log("buildOverview", dat.getTime())
//     remove_graphs()


//     //Use the list of sample names to populate the select options
//     d3.json("/year2017").then((data) => {
//       console.log("metaDatabyYear",data)

//       //*******************************************************//
//       //  Bar Chart by country: happiness_score
//       //*******************************************************//
//       var traceC= {
//         x: data.map(row => row.country), 
//         y: data.map(row => row.happiness_score), 
//         text: data.map(row => row.country), 
//         name: "Happiness_Score",
//         type: "bar"
//       };

//       var dataC = [traceC];

//       var layoutC = {
//           title: "Year of 2017: Happiness Scoreboard by Country",
//           barmode: "group",
//           autosize: true,
//           height:500,
//           width:800

//           };
          
//           // Render the plot to the div tag with id "plot"
//           Plotly.newPlot("chartArea", dataC, layoutC);

//       //*******************************************************//
//       //  Bar Chart by Region: happiness_score
//       //*******************************************************//
//       var traceR= {
//         y: data.map(row => row.happiness_score), 
//         x: data.map(row => row.region), 
//         text: data.map(row => row.region), 
//         name: "Happiness_Score",
//         colorscale: 'YIOrRd',
//         // orientation: "h",
//         // marker:{
//         //   colorscale: 'YIOrRd',
//         // };
//         type: "bar"
//         };

//       var dataR = [traceR];
//       var layoutR = {
//         title: "Year of 2017: Happiness Scoreboard by Region",
//         barmode: "group",
//         autosize: true, 
//         height:550,
//         width:960,
//         };
    
//       // Render the plot to the div tag with id "plot"
//       Plotly.newPlot("chartArea2", dataR, layoutR);


//        //*******************************************************//
//       //  Bar Chart by Region: Population
//       //*******************************************************//
//       var traceP= {
//         y: data.map(row => row.population), 
//         x: data.map(row => row.region), 
//         text: data.map(row => row.region), 
//         name: "Population",
//         type: "bar",
//         // orientation: "h"
//         };

//       var dataP = [traceP];
//       var layoutP = {
//         title: "Year of 2017: Population by Region",
//         barmode: "group",
//         autosize: true, 
//         height:550,
//         width:960,
//         };
    
//       // Render the plot to the div tag with id "plot"
//       Plotly.newPlot("chartArea3", dataP, layoutP);
     
// });
// };

// // buildOverview();


// //*******************************************************************************************************************************//
// // CHART: Build Chart for "Comparison" Button ---------DONE Teresa
// //*******************************************************************************************************************************//
// function buildComparison(comparison){
//     dat = new Date()
//     console.log("buildComparison", dat.getTime())
//     remove_graphs()

//     d3.json("/year2017").then((data) => {
//         console.log("Comparison Button", data)


//       //*******************************************************//
//       // Scatter Plot 
//       //*******************************************************//

//       var traceS1 = {
//         x: data.map(row => row.economy_gdp_per_capita), 
//         y: data.map(row => row.happiness_score), 
//         mode: "markers",
//         type: "scatter",
//         name: "Economy GDP",
//         marker: {
//           color: "green",
//           symbol: "star-triangle-up"
//         }
//       };

//       var traceS2 = {
//         x: data.map(row => row.generosity), 
//         y: data.map(row => row.happiness_score),
//         mode: "markers",
//         type: "scatter",
//         name: "Generosity",
//         marker: {
//           color: "rgb(102,194,165)",
//           symbol: "cross"
//         }
//       };

//       var traceS3 = {
//         x: data.map(row => row.family), 
//         y: data.map(row => row.happiness_score), 
//         mode: "markers",
//         type: "scatter",
//         name: "Family",
//         marker: {
//           color: "blue",
//           symbol: "cross"
//         }
//       };
      
//       var traceS4 = {
//         x: data.map(row => row.health_life_expectancy),
//         y: data.map(row => row.happiness_score),  
//         mode: "markers",
//         type: "scatter",
//         name: "Life Expectancy",
//         marker: {
//           color: "orange",
//           symbol: "#"
//         }
//       };

//       var traceS5 = {
//         x: data.map(row => row.trust_government_corruption),
//         y: data.map(row => row.happiness_score), 
//         mode: "markers",
//         type: "scatter",
//         name: "Goverment Trust",
//         marker: {
//           color: "red",
//           symbol: "diamond-x"
//         }
//       };
      
//       var traceS6 = { 
//         x: data.map(row => row.freedom),
//         y: data.map(row => row.happiness_score), 
//         mode: "markers",
//         type: "scatter",
//         name: "Freedom",
//         marker: {
//           color: "rgba(156, 165, 196, 1.0)",
//           symbol: "cross"
//         }
//       };
      
//       // Create the data array for the plot
//       var dataS = [traceS1, traceS2, traceS3, traceS4, traceS5, traceS6];
     
//      console.log("DATA S", dataS)
      
//       // Define the plot layout
//       var layoutS = {
//         title: "Happiness Scoreboard : Other Factors",
//         yaxis: { title: "Happiness Scale(1 to 10)" },
//         // yaxis: { title: "Happiness Scale(1 to 10)" },
//         autosize: true,
//         height:600,
//         width:1200
//       };
      
//       // Plot the chart to a div tag with id "plot"
//       Plotly.newPlot("chartArea", dataS, layoutS);

//     });



//     //*******************************************************//
//     //  NEW Route from Flask 
//     //*******************************************************//
//     d3.json("/comparison").then((data5) => {
//       // var corrMetaData = data
//       console.log("Comparison Button", data5) 

//       //*******************************************************//
//       //  Bar Chart by country: happiness_score TOP 5 vs Bottom 5
//       //*******************************************************//
//       var traceC= {
//         y: data5.map(row => row.country), 
//         x: data5.map(row => row.happiness_score), 
//         text: data5.map(row => row.country), 
//         name: "Happiness_Score",
//         type: "bar",
//         orientation: "h",
//         margin: {
//             l: 100,
//             r: 100,
//             t: 100,
//             b: 100
//           }
//       };

//       var dataC = [traceC];

//       var layoutC = {
//           title: "Happiness Score (Top 5 vs Bottom 5)",
//           xaxis: { title: "Happiness Scale(1 to 10)" },
//           barmode: "group",
//           autosize: true,
//           height:500,
//           width:800

//           };
          
//           // Render the plot to the div tag with id "plot"
//           Plotly.newPlot("chartArea2", dataC, layoutC);


//       //*******************************************************//
//       //  Bar Chart by country: population
//       //*******************************************************//
//       var traceP= {
//         y: data5.map(row => row.country), 
//         x: data5.map(row => row.population), 
//         text: data5.map(row => row.country), 
//         name: "Population",
//         type: "bar",
//         orientation: "h",
//         margin: {
//             l: 100,
//             r: 100,
//             t: 100,
//             b: 100
//           }
//       };

//       var dataP= [traceP];

//       var layoutP = {
//           title: "Population (Top 5 vs Bottom 5)",
//           barmode: "group",
//           autosize: true,
//           height:500,
//           width:800

//           };
          
//           // Render the plot to the div tag with id "plot"
//           Plotly.newPlot("chartArea3", dataP, layoutP);

//       //*******************************************************//
//       //  Bar Chart by country: economy_gdp_per_capital
//       //*******************************************************//
//       var traceP= {
//         y: data5.map(row => row.country), 
//         x: data5.map(row => row.economy_gdp_per_capita), 
//         text: data5.map(row => row.country), 
//         name: "Economy GDP",
//         type: "bar",
//         orientation: "h",
//         margin: {
//             l: 100,
//             r: 100,
//             t: 100,
//             b: 100
//           }
//       };

//       var dataP= [traceP];

//       var layoutP = {
//           title: "Economy GDP (Top 5 vs Bottom 5)",
//           barmode: "group",
//           autosize: true,
//           height:500,
//           width:800

//           };
          
//           // Render the plot to the div tag with id "plot"
//           Plotly.newPlot("chartArea4", dataP, layoutP);



//     });  
// }
// // buildComparison()



// //*******************************************************************************************************************************//
// // CHART: Build Chart for "Correlation" Button ---------KENDALl
// //*******************************************************************************************************************************//
// function buildCorrelation(corrData){
//     dat = new Date()
//     console.log("buildCorrelation", dat.getTime())
//     remove_graphs()


//     d3.json("/comparison").then((data) => {
//         // var corrMetaData = data
//         console.log("Comparison Button", data) 


      
      




// });
// };
// // buildCorrelation()






// //*******************************************************************************************************************************//
// // Build List: Build Dropdown List for all countries -------DONE Team
// //*******************************************************************************************************************************//
// function countryList() {


//     //Grab a reference to the dropdown select element
//     var selector =d3.select ("#selDataset");

//     //Use the list of sample names to populate the select options
//     d3.json("/countrynames").then((sampleCountries) => {
//         console.log("Country List",sampleCountries)
//         sampleCountries.forEach((country) =>{
//             selector
//                 .append("option")
//                 .text(country)
//                 .property("value", country);
//         });

//     })

// };
// countryList();

// //*******************************************************************************************************************************//
// // Generate 2017 detail for selected country from countryList()--------------DONE Team
// //*******************************************************************************************************************************//
// function buildSample(country){
//     console.log("selectedCountry",country)
//     dat = new Date()
//     console.log("countryDetail", dat.getTime())
//     remove_graphs()

//     var sampleJson
//     // console.log ("buildSample", data)
    
//     d3.json(`/metadata/${country}`).then((data) =>{
//         console.log ("selectedCountry", data)

//         sampleJson =data;
//         var sampleMetadata =d3.select("#chartArea");

//         // Use `.html("") to clear any existing metadata
//         sampleMetadata.html("");

//         // Use `Object.entries` to add each key and value pair to the panel
//         //NOTE: iterating through an Object then append output as paragraphs 
//         Object.entries(data).forEach(([key,value]) => {
//             console.log("value", `${key}:${value}`)
//         sampleMetadata.append("h6").text(`${key}:${value}`) // HTML -div id="sample-metadata"



   
//       });
//     });
// };

// // buildSample();

// //*******************************************************************************************************************************//
// // Global Function to remove graph when a new "Button" function is call ----DONE Team
// //*******************************************************************************************************************************//
// function remove_graphs(){
//     d3.selectAll("#chartArea > *").html("")
//     d3.selectAll("#chartArea2 > *").html("")
//     d3.selectAll("#chartArea3 > *").html("")
//     d3.selectAll("#chartArea4 > *").html("")
// }

// //*******************************************************************************************************************************//
// // Global Function to initialize the homepage// ------ doesn't work 
// //*******************************************************************************************************************************//
// function init(){
//   buildOverview()
//     // window.onload = function(welcome) { 
//     //   window.print(); }
// }

init();
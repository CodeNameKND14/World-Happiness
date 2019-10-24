// Pull metedata for 2015
function metaData15(country){
    console.log("selectedCountry15",country)
    dat = new Date()
    console.log("countryDetail", dat.getTime())    

    // use d3.json to fetch data from database 
    d3.json(`/metaData15/${country}`).then((data) =>{
        
        console.log ("selectedCountry15", data)

        var metaDataYear =d3.select("#year15");
        var metaDataCountry =d3.select("#country15");
        var metaDataRegion =d3.select("#region15");
        var metaDataCountryCode =d3.select("#countryCode15");
        var metaDataHappinessScore =d3.select("#happinessScore15");
        var metaDataHappinessRank =d3.select("#happinessRank15");
        var metaDataPop =d3.select("#happinessPop15");
        var metaDataGDP =d3.select("#GDP15");
        var metaDataFamily =d3.select("#family15");
        var metaDataLife =d3.select("#life15");
        var metaDataFreedom =d3.select("#freedom15");
        var metaDataGenerosity =d3.select("#generosity15");
        var metaDataTrust =d3.select("#trust15");
        var metaDataDystopia = d3.select("#dystopia15");

        // Use `.html("") to clear any existing metadata
        metaDataYear.html("");
        metaDataCountry .html("");
        metaDataRegion.html("");
        metaDataCountryCode.html("");
        metaDataHappinessScore.html("");
        metaDataHappinessRank.html("");
        metaDataPop.html("");
        metaDataGDP.html("");
        metaDataFamily.html("");
        metaDataLife.html("");
        metaDataFreedom.html("");
        metaDataGenerosity.html("");
        metaDataTrust.html("");
        metaDataDystopia.html("");

        // Use `Object.entries` to add each key and value pair to the panel

        Object.entries(data).forEach(([key,value]) => {
            console.log(key)
            if(key == "Year"){
                metaDataYear.append("h4").text(`${value}`)

            } else if(key == "Country"){
                metaDataCountry.append("h4").text(`${value} `)
            }else if(key == "Region"){
                metaDataRegion.append("li").text(`${key}: ${value}`)
            }else if(key == "Country Code"){
                metaDataCountryCode.append("h5").text(`${value}`)
            }else if(key == "Happiness Score"){
                metaDataHappinessScore.append("li").text(`${key}: ${value}`)
            }else if(key == "Happiness Rank"){
                metaDataHappinessRank.append("li").text(`${key}: ${value}`)
            }else if(key == "Population"){
                metaDataPop.append("li").text(`${key}: ${value}`)
            }else if(key == "GDP per Capita"){
                metaDataGDP.append("li").text(`${key}: ${value}`)
            }else if(key == "Family"){
                metaDataFamily.append("li").text(`${key}: ${value}`)
            }else if(key == "Life Expectancy"){
                metaDataLife.append("li").text(`${key}: ${value}`)
            }else if(key == "Freedom"){
                metaDataFreedom.append("li").text(`${key}: ${value}`)
            }else if(key == "Generosity"){
                metaDataGenerosity.append("li").text(`${key}: ${value}`)
            }else if(key == "Trust in Government"){
                metaDataTrust.append("li").text(`${key}: ${value}`)
            }else if(key == "Dystopia Residual"){
                metaDataDystopia.append("li").text(`${key}: ${value}`)
            }  
      });
    });
};

// Pull metedata for 2016
function metaData16(country){
    console.log("selectedCountry16",country)
    dat = new Date()
    console.log("countryDetail", dat.getTime())

    // use d3.json to fetch data from database 
    d3.json(`/metaData16/${country}`).then((data) =>{
        console.log ("selectedCountry16", data)

        var metaDataYear =d3.select("#year16");
        var metaDataCountry =d3.select("#country16");
        var metaDataRegion =d3.select("#region16");
        var metaDataCountryCode =d3.select("#countryCode16");
        var metaDataHappinessScore =d3.select("#happinessScore16");
        var metaDataHappinessRank =d3.select("#happinessRank16");
        var metaDataPop =d3.select("#happinessPop16");
        var metaDataGDP =d3.select("#GDP16");
        var metaDataFamily =d3.select("#family16");
        var metaDataLife =d3.select("#life16");
        var metaDataFreedom =d3.select("#freedom16");
        var metaDataGenerosity =d3.select("#generosity16");
        var metaDataTrust =d3.select("#trust16");
        var metaDataDystopia = d3.select("#dystopia16");

        // Use `.html("") to clear any existing metadata
        metaDataYear.html("");
        metaDataCountry .html("");
        metaDataRegion.html("");
        metaDataCountryCode.html("");
        metaDataHappinessScore.html("");
        metaDataHappinessRank.html("");
        metaDataPop.html("");
        metaDataGDP.html("");
        metaDataFamily.html("");
        metaDataLife.html("");
        metaDataFreedom.html("");
        metaDataGenerosity.html("");
        metaDataTrust.html("");
        metaDataDystopia.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(data).forEach(([key,value]) => {
            console.log(key)
            if(key == "Year"){
                metaDataYear.append("h4").text(`${value}`)

            } else if(key == "Country"){
                metaDataCountry.append("h4").text(`${value} `)
            }else if(key == "Region"){
                metaDataRegion.append("li").text(`${key}: ${value}`)
            }else if(key == "Country Code"){
                metaDataCountryCode.append("h5").text(`${value}`)
            }else if(key == "Happiness Score"){
                metaDataHappinessScore.append("li").text(`${key}: ${value}`)
            }else if(key == "Happiness Rank"){
                metaDataHappinessRank.append("li").text(`${key}: ${value}`)
            }else if(key == "Population"){
                metaDataPop.append("li").text(`${key}: ${value}`)
            }else if(key == "GDP per Capita"){
                metaDataGDP.append("li").text(`${key}: ${value}`)
            }else if(key == "Family"){
                metaDataFamily.append("li").text(`${key}: ${value}`)
            }else if(key == "Life Expectancy"){
                metaDataLife.append("li").text(`${key}: ${value}`)
            }else if(key == "Freedom"){
                metaDataFreedom.append("li").text(`${key}: ${value}`)
            }else if(key == "Generosity"){
                metaDataGenerosity.append("li").text(`${key}: ${value}`)
            }else if(key == "Trust in Government"){
                metaDataTrust.append("li").text(`${key}: ${value}`)
            }else if(key == "Dystopia Residual"){
                metaDataDystopia.append("li").text(`${key}: ${value}`)
            }
      });
    });
};

// Pull metadat for 2017
function metaData17(country){
    console.log("selectedCountry17",country)
    dat = new Date()
    console.log("countryDetail", dat.getTime())
 
    // use d3.json to fetch data from database 
    d3.json(`/metaData17/${country}`).then((data) =>{
        console.log ("selectedCountry17", data)

        var metaDataYear =d3.select("#year17");
        var metaDataCountry =d3.select("#country17");
        var metaDataRegion =d3.select("#region17");
        var metaDataCountryCode =d3.select("#countryCode17");
        var metaDataHappinessScore =d3.select("#happinessScore17");
        var metaDataHappinessRank =d3.select("#happinessRank17");
        var metaDataPop =d3.select("#happinessPop17");
        var metaDataGDP =d3.select("#GDP17");
        var metaDataFamily =d3.select("#family17");
        var metaDataLife =d3.select("#life17");
        var metaDataFreedom =d3.select("#freedom17");
        var metaDataGenerosity =d3.select("#generosity17");
        var metaDataTrust =d3.select("#trust17");
        var metaDataDystopia = d3.select("#dystopia17");

        // Use `.html("") to clear any existing metadata
        metaDataYear.html("");
        metaDataCountry .html("");
        metaDataRegion.html("");
        metaDataCountryCode.html("");
        metaDataHappinessScore.html("");
        metaDataHappinessRank.html("");
        metaDataPop.html("");
        metaDataGDP.html("");
        metaDataFamily.html("");
        metaDataLife.html("");
        metaDataFreedom.html("");
        metaDataGenerosity.html("");
        metaDataTrust.html("");
        metaDataDystopia.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(data).forEach(([key,value]) => {
            console.log(key)
            if(key == "Year"){
                metaDataYear.append("h5").text(`${value}`)

            } else if(key == "Country"){
                metaDataCountry.append("h4").text(`${value} `)
            }else if(key == "Region"){
                metaDataRegion.append("li").text(`${key}: ${value}`)
            }else if(key == "Country Code"){
                metaDataCountryCode.append("h5").text(`${value}`)
            }else if(key == "Happiness Score"){
                metaDataHappinessScore.append("li").text(`${key}: ${value}`)
            }else if(key == "Happiness Rank"){
                metaDataHappinessRank.append("li").text(`${key}: ${value}`)
            }else if(key == "Population"){
                metaDataPop.append("li").text(`${key}: ${value}`)
            }else if(key == "GDP per Capita"){
                metaDataGDP.append("li").text(`${key}: ${value}`)
            }else if(key == "Family"){
                metaDataFamily.append("li").text(`${key}: ${value}`)
            }else if(key == "Life Expectancy"){
                metaDataLife.append("li").text(`${key}: ${value}`)
            }else if(key == "Freedom"){
                metaDataFreedom.append("li").text(`${key}: ${value}`)
            }else if(key == "Generosity"){
                metaDataGenerosity.append("li").text(`${key}: ${value}`)
            }else if(key == "Trust in Government"){
                metaDataTrust.append("li").text(`${key}: ${value}`)
            }else if(key == "Dystopia Residual"){
                metaDataDystopia.append("li").text(`${key}: ${value}`)
            }
      });
    });
};


function init() {
    
    // Grabbed a reference to the dropdown select element
    var selector = d3.select("#selDataSetCountry");

    // Used the list of sample names to populate the select options
    d3.json("/country").then((sampleCountry) => {
        sampleCountry.forEach((sample) => {
            selector
            .append("option")
            .text(sample)
            .property("value", sample);
   });
   console.log("SAMPLE Country", sampleCountry)
   // Use the first sample from the list to build the default/initial plots
   var firstSample = sampleCountry[0];
   console.log(firstSample)
   
 });
};

function countryChange(country) {
    
    // Fetch new data each time a new sample is selected
    console.log("This is new data", country); 
    // builds the charts
    metaData15(country); 
    metaData16(country);
    metaData17(country);
   
}

function remove_graphs(){
    d3.selectAll("#metaData15 > *").html("")
    d3.selectAll("#metaData16 > *").html("")
    d3.selectAll("#metaData17 > *").html("")

}
init();
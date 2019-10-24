#################################################
#  Import Dependencies 
#################################################
import os
import csv 

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from sqlalchemy import create_engine, func, inspect


from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

import sqlite3
import json

# Create a instance of Flask
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# Configure our Flask instance to sqllite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/database.sqlite'

# Create database object using SQLAlchemy
db = SQLAlchemy(app)

# Reflect an existing database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(db.engine, reflect=True)

print(Base.metadata.tables.keys())
# Save references to each table
happinessMaster = Base.classes.happinessMaster
happiness_15 = Base.classes.happiness_2015df
happiness_16 = Base.classes.happiness_2016df
happiness_17 = Base.classes.happiness_2017df

#################################################
# Route Setup
#################################################

# Route to render index.html template 
@app.route("/")
def index():
    """Return the homepage."""
    # return render_template("index.html", metadataTable =Samples_html)
    return render_template("index.html")

# Route to render method.html
@app.route('/method')
def method():
    return render_template("method.html")

# Route to render happinessCorr.html
@app.route('/happinessCorr')
def happinessCorr():
    return render_template("happinessCorr.html")

# Route to render JSON of Country Names 
@app.route("/country")
def country():
    # do i need to create engine 
    results = db.session.query(happinessMaster.country).all()

    country = list(np.ravel(results))
    print(country)
    return jsonify(country)

# Route to render JSON of Years 
@app.route("/year")
def year():
    results = db.session.query(happinessMaster.year).distinct()
    print(results)
    year = []
    for result in results:
        if result not in year:
            year.append(result)
    return jsonify(year)

# Route to render JSON of data for happiness score bar graph by year 
@app.route("/happinessYear/<sample>")
def bar_graph(sample):
    sel = [
        happinessMaster.year,
        happinessMaster.country,
        happinessMaster.happiness_rank,
        happinessMaster.happiness_score,
    ]
    
    results = db.session.query(*sel).order_by(happinessMaster.happiness_score).filter(happinessMaster.year == sample).all()
    year = []
    country = []
    happiness_rank = []
    happiness_score = []
    for result in results:
        year.append(result[0])
        country.append(result[1])
        happiness_rank.append(result[2])
        happiness_score.append(result[3])

    happiness_data = {
        "country":country,
        "happiness_rank": happiness_rank,
        "happiness_score": happiness_score,
        "year": year
    }
    return jsonify(happiness_data)

# Route to render JSON of data for happiness score by region bar graph by year 
@app.route("/happinessRegion/<sample>")
def bar_graph_region(sample):
    results = db.session.query(happinessMaster.region, func.avg(happinessMaster.happiness_score), func.sum(happinessMaster.population), happinessMaster.year).group_by(happinessMaster.year, happinessMaster.region).filter(happinessMaster.year == sample).all()

    avg_happiness_score = []
    population = []
    year = []
    region = []
    for result in results:
        region.append(result[0])
        avg_happiness_score.append(result[1])
        population.append(result[2])
        year.append(result[3])

    data = {
        "region":region,
        "avg_happiness_score": avg_happiness_score ,
        "population": population,
        "year": year
        }
    return jsonify(data)

# Route to render JSON of data for happiness score vs. six variables scatter plot 
@app.route("/happinessScatter/<sample>")
def scatter_graph(sample):
    sel = [
        happinessMaster.year,
        happinessMaster.happiness_score,
        happinessMaster.economy_gdp_per_capita,
        happinessMaster.family,
        happinessMaster.health_life_expectancy,
        happinessMaster.freedom,
        happinessMaster.generosity,
        happinessMaster.trust_government_corruption,
        happinessMaster.happiness_rank ,
    ]
    happiness_score = []
    year = []
    economy_gdp_per_capita = []
    family = []
    health_life_expectancy = []
    freedom = []
    generosity = []
    trust_government_corruption = []
    happiness_rank = []

    results = db.session.query(*sel).filter(happinessMaster.year == sample).all()
    for result in results:
        year.append(result[0])
        happiness_score.append(result[1])
        economy_gdp_per_capita.append(result[2])
        family.append(result[3])
        health_life_expectancy.append(result[4])
        freedom.append(result[5])
        generosity.append(result[6])
        trust_government_corruption.append(result[7])
        happiness_rank.append(result[8])

    data = {
    "year": year,
    "happiness_score": happiness_score,
    "economy_gdp_per_capita": economy_gdp_per_capita,
    "family": family,
    "health_life_expectancy": health_life_expectancy,
    "freedom": freedom,
    "generosity": generosity,
    "trust_government_corruption": trust_government_corruption,
    "happiness_rank": happiness_rank

    }

    return jsonify(data)

# Route to render JSON of data for 2015 happiness metadata  
@app.route("/metaData15/<sample>")
def metaData15(sample):
    sel = [
    happiness_15.year,
    happiness_15.country,
    happiness_15.region,
    happiness_15.country_code,
    happiness_15.happiness_rank,
    happiness_15.happiness_score,
    happiness_15.population,
    happiness_15.economy_gdp_per_capita,
    happiness_15.family,
    happiness_15.health_life_expectancy,
    happiness_15.freedom,
    happiness_15.generosity,
    happiness_15.trust_government_corruption,
    happiness_15.dystopia_residual
    ]
    
    year = []
    country = []
    region = []
    country_code = []
    happiness_rank = []
    happiness_score = []
    population = []
    economy_gdp_per_capita = []
    family = []
    health_life_expectancy = []
    freedom = []
    generosity = []
    trust_government_corruption = []
    dystopia_residual = []

    results = db.session.query(*sel).filter(happiness_15.country == sample).all()
    print(results)
    for result in results:
        print(result)
        year.append(result[0])
        country.append(result[1])
        region.append(result[2])
        country_code.append(result[3])
        happiness_score.append(result[4])
        happiness_rank.append(result[5])
        population.append(result[6])
        economy_gdp_per_capita.append(result[7])
        family.append(result[8])
        health_life_expectancy.append(result[9])
        freedom.append(result[10])
        generosity.append(result[11])
        trust_government_corruption.append(result[12])
        dystopia_residual.append(result[13])
    
    data = {
    "Year": year,
    "Country": country,
    "Region": region,
    "Country Code": country_code,
    "Happiness Score": happiness_score,
    "Happiness Rank": happiness_rank,
    "Population": population,
    "GDP per Capita": economy_gdp_per_capita,
    "Family": family,
    "Life Expectancy": health_life_expectancy,
    "Freedom": freedom,
    "Generosity": generosity,
    "Trust in Government": trust_government_corruption,
    "Dystopia Residual": dystopia_residual
    }

    return jsonify(data)

# Route to render JSON of data for 2016 happiness metadata  
@app.route("/metaData16/<sample>")
def metaData16(sample):
    sel = [
    happiness_16.year,
    happiness_16.country,
    happiness_16.region,
    happiness_16.country_code,
    happiness_16.happiness_rank,
    happiness_16.happiness_score,
    happiness_16.population,
    happiness_16.economy_gdp_per_capita,
    happiness_16.family,
    happiness_16.health_life_expectancy,
    happiness_16.freedom,
    happiness_16.generosity,
    happiness_16.trust_government_corruption,
    happiness_16.dystopia_residual
    ]
    
    year = []
    country = []
    region = []
    country_code = []
    happiness_rank = []
    happiness_score = []
    population = []
    economy_gdp_per_capita = []
    family = []
    health_life_expectancy = []
    freedom = []
    generosity = []
    trust_government_corruption = []
    dystopia_residual = []

    results = db.session.query(*sel).filter(happiness_16.country == sample).all()
    print(results)
    for result in results:
        print(result)
        year.append(result[0])
        country.append(result[1])
        region.append(result[2])
        country_code.append(result[3])
        happiness_score.append(result[4])
        happiness_rank.append(result[5])
        population.append(result[6])
        economy_gdp_per_capita.append(result[7])
        family.append(result[8])
        health_life_expectancy.append(result[9])
        freedom.append(result[10])
        generosity.append(result[11])
        trust_government_corruption.append(result[12])
        dystopia_residual.append(result[13])
    
    data = {
    "Year": year,
    "Country": country,
    "Region": region,
    "Country Code": country_code,
    "Happiness Score": happiness_score,
    "Happiness Rank": happiness_rank,
    "Population": population,
    "GDP per Capita": economy_gdp_per_capita,
    "Family": family,
    "Life Expectancy": health_life_expectancy,
    "Freedom": freedom,
    "Generosity": generosity,
    "Trust in Government": trust_government_corruption,
    "Dystopia Residual": dystopia_residual
    }

    return jsonify(data)

# Route to render JSON of data for 2017 happiness metadata  
@app.route("/metaData17/<sample>")
def metaData17(sample):
    sel = [
    happiness_17.year,
    happiness_17.country,
    happiness_17.region,
    happiness_17.country_code,
    happiness_17.happiness_rank,
    happiness_17.happiness_score,
    happiness_17.population,
    happiness_17.economy_gdp_per_capita,
    happiness_17.family,
    happiness_17.health_life_expectancy,
    happiness_17.freedom,
    happiness_17.generosity,
    happiness_17.trust_government_corruption,
    happiness_17.dystopia_residual
    ]
    
    year = []
    country = []
    region = []
    country_code = []
    happiness_rank = []
    happiness_score = []
    population = []
    economy_gdp_per_capita = []
    family = []
    health_life_expectancy = []
    freedom = []
    generosity = []
    trust_government_corruption = []
    dystopia_residual = []

    results = db.session.query(*sel).filter(happiness_17.country == sample).all()
    print(results)
    for result in results:
        print(result)
        year.append(result[0])
        country.append(result[1])
        region.append(result[2])
        country_code.append(result[3])
        happiness_score.append(result[4])
        happiness_rank.append(result[5])
        population.append(result[6])
        economy_gdp_per_capita.append(result[7])
        family.append(result[8])
        health_life_expectancy.append(result[9])
        freedom.append(result[10])
        generosity.append(result[11])
        trust_government_corruption.append(result[12])
        dystopia_residual.append(result[13])
    
    data = {
    "Year": year,
    "Country": country,
    "Region": region,
    "Country Code": country_code,
    "Happiness Score": happiness_score,
    "Happiness Rank": happiness_rank,
    "Population": population,
    "GDP per Capita": economy_gdp_per_capita,
    "Family": family,
    "Life Expectancy": health_life_expectancy,
    "Freedom": freedom,
    "Generosity": generosity,
    "Trust in Government": trust_government_corruption,
    "Dystopia Residual": dystopia_residual
    }

    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5001,debug = True)
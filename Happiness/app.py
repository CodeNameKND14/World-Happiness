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
from sqlalchemy import create_engine


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
    connection = sqlite3.connect("db/database.sqlite",  check_same_thread = False)
    cursor =connection.cursor()
    query =f"select country from happinessMaster;"
    output=cursor.execute(query)

    country = []
    
    for row in output:
        print(row)
        country.append(row[0])

    return jsonify(country)

# Route to render JSON of Years 
@app.route("/year")
def year():
    connection = sqlite3.connect("db/database.sqlite",  check_same_thread = False)
    cursor =connection.cursor()
    query =f"select year from happinessMaster;"
    output=cursor.execute(query)
    
    year = []
    for row in output:
        
        if row[0] not in year:
            year.append(row[0])
    return jsonify(year)


# Route to render JSON of data for happiness score bar graph by year 
@app.route("/happinessYear/<sample>")
def bar_graph(sample):
    connection = sqlite3.connect("db/database.sqlite",  check_same_thread = False)
    cursor =connection.cursor()
    query =f"select year, country, happiness_rank, happiness_score from happinessMaster;"
    output=cursor.execute(query).fetchall()
    country = []
    happiness_rank = []
    happiness_score = []
    year = []
    
    for row in output:
        if str(row[0]) == sample:

            year.append(row[0])
            country.append(row[1])
            happiness_rank.append(row[2])
            happiness_score.append(row[3])
    happiness_score.sort(reverse = True) 
        
    data = {
    "country":country,
    "happiness_rank": happiness_rank,
    "happiness_score": happiness_score,
    "year": year
    }

    return jsonify(data)


# Route to render JSON of data for happiness score by region bar graph by year 
@app.route("/happinessRegion/<sample>")
def bar_graph_region(sample):
    connection = sqlite3.connect("db/database.sqlite",  check_same_thread = False)
    cursor =connection.cursor()
    query =f"select region, avg(happiness_score), sum(population), year from happinessMaster group by year, region;"
    output=cursor.execute(query)

    avg_happiness_score = []
    population = []
    year = []
    region = []
    
    for row in output:

        if str(row[3]) == sample:
            region.append(row[0])
            avg_happiness_score.append(row[1])
            population.append(row[2])
            year.append(row[3])

        
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
    connection = sqlite3.connect("db/database.sqlite",  check_same_thread = False)
    cursor =connection.cursor()
    query =f"select year, happiness_score, economy_gdp_per_capita, family, health_life_expectancy, freedom, generosity, trust_government_corruption, happiness_rank from happinessMaster;"
    output=cursor.execute(query)
    
    happiness_score = []
    year = []
    economy_gdp_per_capita = []
    family = []
    health_life_expectancy = []
    freedom = []
    generosity = []
    trust_government_corruption = []
    happiness_rank = []
    for row in output:

        if str(row[0]) == sample:

            year.append(row[0])
            happiness_score.append(row[1])
            economy_gdp_per_capita.append(row[2])
            family.append(row[3])
            health_life_expectancy.append(row[4])
            freedom.append(row[5])
            generosity.append(row[6])
            trust_government_corruption.append(row[7])
            happiness_rank.append(row[8])
        
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
    connection = sqlite3.connect("db/database.sqlite",  check_same_thread = False)
    cursor =connection.cursor()
    query =f"select * from happiness_2015df;"
    output=cursor.execute(query)
    
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

    for row in output:

        if row[2] == sample:
            #print(row)\
            year.append(row[1])
            country.append(row[2])
            region.append(row[3])
            country_code.append(row[4])
            happiness_score.append(row[5])
            happiness_rank.append(row[6])
            population.append(row[7])
            economy_gdp_per_capita.append(row[8])
            family.append(row[9])
            health_life_expectancy.append(row[10])
            freedom.append(row[11])
            generosity.append(row[12])
            trust_government_corruption.append(row[13])
            dystopia_residual.append(row[14])
            
        
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
    connection = sqlite3.connect("db/database.sqlite",  check_same_thread = False)
    cursor =connection.cursor()
    query =f"select * from happiness_2016df;"
    output=cursor.execute(query)
    
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

    for row in output:

        if row[2] == sample:

            year.append(row[1])
            country.append(row[2])
            region.append(row[3])
            country_code.append(row[4])
            happiness_score.append(row[5])
            happiness_rank.append(row[6])
            population.append(row[7])
            economy_gdp_per_capita.append(row[8])
            family.append(row[9])
            health_life_expectancy.append(row[10])
            freedom.append(row[11])
            generosity.append(row[12])
            trust_government_corruption.append(row[13])
            dystopia_residual.append(row[14])
            
        
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
    connection = sqlite3.connect("db/database.sqlite",  check_same_thread = False)
    cursor =connection.cursor()
    query =f"select * from happiness_2017df;"
    output=cursor.execute(query)
    
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

    for row in output:

        if row[2] == sample:

            year.append(row[1])
            country.append(row[2])
            region.append(row[3])
            country_code.append(row[4])
            happiness_score.append(row[5])
            happiness_rank.append(row[6])
            population.append(row[7])
            economy_gdp_per_capita.append(row[8])
            family.append(row[9])
            health_life_expectancy.append(row[10])
            freedom.append(row[11])
            generosity.append(row[12])
            trust_government_corruption.append(row[13])
            dystopia_residual.append(row[14])
            
        
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
# World Happiness

Members: Adam Dunbar, Kendall Jackson, Teresa Ruan


## GOAL
Identify and visualize trends related to a country’s happiness score from the years ranging from 2015-2017 on an interactive dashboard. You can view [here](https://country-happiness.herokuapp.com/).

# CALCULATION OF DATA
## SCORE
The happiness score is ranked from 0 – 10, 10 being the best possible life and 0 being the worst possible life. There are six factors used – economic production, social support, life expectancy, freedom, trust in government, and generosity – that contribute to making life evaluations higher in each country than they are in Dystopia.

## DYSTOPIA
Dystopia is a hypothetical society that is extremely undesirable, with the world’s least happy people, whose countries values equal to the world’s lowest national averages for each of the six factors. This country acts as a benchmark against which all the other countries can be favorably compared. The lowest score observed for the six measurements characterizes Dystopia.

## RESIDUALS
The Dystopia residuals are used to reflect the distance of the six factors for each country from Dystopia. The residuals are used to calculate the final happiness score so that the final evaluation will always be positive even if the six factors all equal 0.

## GATHERING DATA
For this project the original data was downloaded as a csv file from Kaggle. It was then cleaned using Python, inside Jupyter Notebook, and data wrangling techniques with relevant libraries such as Pandas. The data was then pushed to a Postgres database using SQLAlchemy.

The newly cleaned csv files were taken and converted into a SQLite database for this project. SQLite proved as a more efficient connection as opposed to connecting directly to the Postgres database and remapping the tables. A flask app was built connecting the database to our JavaScript and HTML code.

# SYNOPSIS

## HAPPINESS SCORE VS. SIX VARIABLES
Using `plotly.js`, a scatter plot was created. The plot helped illustrate how much gravity each variable held when compared to the happiness score. Though each variable had a seemingly positive correlation, gdp, family, and life expectancy had the largest impact on how happy an individual felt throughout the three years. When comparing happiness to a metric like GDP we can see that generally, happier countries have a higher GDP.


## AVG HAPPINESS SCORE BY REGION VS. POPULATION BY REGION
In order to take a closer look at population and its relationship with the happiness score, a bar graph was made using `plotly.js`. When first examining the chart and only looking at the highest happiness score by region, lowest happiness score by region, and comparing that to its population, one can see that there seems to be an inverse effect. However, when examining the other happiness scores between the lowest and the highest, this conclusion quickly demonstrates its inaccuracy. There does not seem to be a discernable trend concerning these two variables. There is only a small amount of shift between both the average happiness score and the population. This is due to the limited amount of years being observed, ergo, we cannot make a confident statement about the negative correlation between the average happiness score and population size.

## DISCUSSION
Our initial hypothesis was that there would be a meaningful and positive linear correlation between the variables gdp, life expectancy, and trust in government and that these variables would be the top three most impactful measurements for happiness score. Additioanlly, we believed that there would be a negative linear correlation between population size and happiness score. We were correct on two of the measurements, however, our analysis illustrated that trust in government was the least impactful of all the variables and that there was no distinguishable trend between happiness and population. There may be several explanations for this, however, additional analysis would be needed. You can view each countries correlation coefficient between their happiness score and the six measured variables [here](https://country-happiness.herokuapp.com/happinessCorr).

For a deeper examination of a countries happiness score, we would take a deeper dive into each individual variable to try and answer questions like: Why did these variables have this specific effect on these countries? What do countries with different democracies have in common? How does a country with a high GDP per Capita decide to operate both locally and on a global scale? And how does that correlate with a countries happiness score?

Information like this can be important for businesses wanting to better company moral, schools with low happiness trying to combat depression in students, and even parents when deciding how to raise a child. All in all, happiness is vital to our own goals in life and this analysis illustrates that it has a larger impact on our surrounding environment

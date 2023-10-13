#Bangladesh Kitchen

from bs4 import BeautifulSoup
import requests
import re
from openpyxl import load_workbook
import openpyxl
from translate import Translator

link = 'https://www.thebangladeshikitchen.com/recipes/homestyle-chicken-korma/'

html_texts = requests.get(link).text

soup = BeautifulSoup(html_texts, 'lxml')

#find the name of the recipe
name = soup.find('div', id='page-title')

name = name.h1.text.strip()

# find the serving

serving = soup.find('div', id='time-more-pro').text[-1].strip()

# find the time
times = soup.find('span', class_='time-pro').text.strip()

times = re.split('\s', times)

time = 0

if (times[1] == 'hour' or times[1] == 'hr') and len(times) > 2:
    time += float(times[0]) * 60
    time += float(times[2])
elif (times[1] == 'hour' or times[1] == 'hr') and len(times) <= 2:
    time += float(times[0]) * 60
else:
    time += float(times[0])

# find ingredients
ingredients = soup.find('div', id='recipe_content_pro').ul

ing_n = []
ing_q = []

for ing in ingredients.find_all('li'):
    texts = ing.text.strip()
    texts = re.split('\s', texts)

    if texts[1] == 'pounds':
        texts[0] = str(float(texts[0]) * 454) + 'g'
        texts[1] = ''
    elif texts[1] == 'cup':
        if texts[0] == '½':
            texts[0] = 0.5
        texts[0] = str(float(texts[0]) * 250) + 'g'
        texts[1] = ''
    elif texts[1] == 'tsp' or texts[1] == 'teaspoon':
        if texts[0] == '½':
            texts[0] = 0.
        texts[0] = str(float(texts[0]) * 4.2) + 'g'
        texts[1] = ''
    elif texts[1] == 'tbsp' or texts[1] == 'tablespoon':
        texts[0] = str(float(texts[0]) * 15) + 'g'
        texts[1] = ''

    print(texts)

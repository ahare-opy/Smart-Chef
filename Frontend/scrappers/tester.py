import pandas as pd
from _datetime import datetime

df1 = pd.read_excel('Dhaka_Stock_Exchange_Broad_Historical_Data.xlsx')

c=-1
d=0

for a in df1.Date:
    ++c
    try:
        a = datetime.strptime(a, '%m-%d-%Y').date()
        df1.Date[c].replace(a)
    except:
        ++d

print(type(df1.Date[12]), df1.Date[12])

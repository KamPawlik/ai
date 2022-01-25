from django.contrib.staticfiles import finders

import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

def calculate_house_price(house_obj):
    house_df = pd.DataFrame(house_obj,  index=[0])
    house_csv = finders.find('houses.csv')

    houses = pd.read_csv(house_csv, encoding='Windows-1252')
    houses.drop(['Unnamed: 0', 'id', 'address', 'city', 'latitude', 'longitude'], axis=1, inplace=True)

    houses['pricem2'] = houses['price']/houses['sq']
    Q1 = houses['pricem2'].quantile(0.25)
    Q2 = houses['pricem2'].quantile(0.75)
    IQR = Q2 - Q1
    houses = houses[~((houses['pricem2'] < (Q1 - 1.5 * IQR)) | (houses['pricem2'] > (Q2 + 1.5 * IQR)))]
    houses.drop(['pricem2'], axis=1, inplace=True)

    X = houses.drop(['price'], axis=1)
    y = houses['price']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=26)

    randomforest = RandomForestRegressor()
    randomforest.fit(X_train, y_train)
    house_price = randomforest.predict(house_df)[0]
    return house_price

from django.contrib.staticfiles import finders

import pandas as pd

from sklearn.neural_network import MLPRegressor

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
    randomforest = MLPRegressor((3,2))
    randomforest.fit(X, y)
    house_price = randomforest.predict(house_df)[0]
    return house_price

import json
import re
import psycopg2 as pg
import pandas as pd
import pandas.io.sql as psql

from pandas.io.json import json_normalize


def slugify(value):
    """
    Normalizes string, converts to lowercase, removes non-alpha characters,
    and converts spaces to hyphens.
    """
    value = re.sub('[^\w\s-]', '', value).strip().lower()
    value = re.sub('[-\s]+', '-', value)
    return value


# get connected to the database
connection = pg.connect(dbname="postgres",
                        user="postgres",
                        password="vLfmVz@7O51P",
                        host="dev.354thestars.com",
                        port="5432")

cats = psql.read_sql("SELECT * FROM section", connection)
cats_to_add = pd.DataFrame(columns=cats.columns)

jsonStr = open("json_dat_sample.json", "r", encoding="utf-8").read()
raw_json = json.loads(jsonStr)

cats_to_add_dat = json_normalize(raw_json['categories']).drop(columns='subCategories')
cats_exists = [i[0] for i in cats[['name']].values]

# print(cats_exists)
# print(cats_to_add_dat)


# todo replace with sequence and sequence.next()
seq = int(cats.iloc[-1,:]['id'])

cats_exists.extend(['not_in'] * (len(cats_to_add_dat) - len(cats_exists)))
# print(cats_to_add_dat[cats_to_add_dat['label'] != cats_exists])
# [id, name, description, permalink, icon]

cursor = connection.cursor()

sql = "INSERT INTO section (id, name, permalink, icon) VALUES (%s, %s, %s, %s)"

with open('SQL_QUERIES.txt', 'w') as f:
    for k, v in cats_to_add_dat[cats_to_add_dat['label'] != cats_exists].iterrows():
        seq += 1
        cursor.execute(sql, (seq, v['label'], slugify(v['label']), v['imageUrl']))
        f.write(sql%(seq, v['label'], slugify(v['label']), v['imageUrl'])+'\n')

# connection.commit()
connection.close()


#
# cat3 = json_normalize(raw_json['categories'], ['subCategories', 'listings', 'imageUrls'],
#                        [['subCategories', 'label'], ['subCategories', 'listings', 'label']])



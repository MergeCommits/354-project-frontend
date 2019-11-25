import json
import re
import psycopg2 as pg
import pandas as pd
import pandas.io.sql as psql
import random

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

cat2all = json_normalize(raw_json['categories'], 'subCategories', 'label', record_prefix='sub_').drop(
    columns='sub_listings')
cats2 = psql.read_sql("SELECT * FROM category", connection)
cats2_to_add = pd.DataFrame(columns=cats2.columns)
prods = json_normalize(raw_json['categories'], ['subCategories', 'listings'],
                       [['subCategories', 'label']], record_prefix='sub_')
prodsSQL = psql.read_sql("SELECT * FROM product", connection)

# todo replace with sequence and sequence.next()
seq = int(cats.iloc[-1,:]['id'])

cats_exists.extend(['not_in'] * (len(cats_to_add_dat) - len(cats_exists)))

cursor = connection.cursor()

sql = "INSERT INTO section (id, name, permalink, icon) VALUES (%s, %s, %s, %s)"

with open('SQL_QUERIES.txt', 'w', encoding="utf-8") as f:
    for k, v in cats_to_add_dat[cats_to_add_dat['label'] != cats_exists].iterrows():
        seq += 1
        cursor.execute(sql, (seq, v['label'], slugify(v['label']), v['imageUrl']))
        f.write(sql%(seq, v['label'], slugify(v['label']), v['imageUrl'])+'\n')
        cats_to_add=cats_to_add.append({"id": seq, "name": v['label'], "permalink": slugify(v['label']),
                                        "icon": v['imageUrl']}, ignore_index=True)
    seq = int(cats2.iloc[-1, :]['id'])
    sql = "INSERT INTO category (id, section_id, name, permalink, icon) VALUES (%s, %s, %s, %s, %s)"
    for k, v in pd.merge(cat2all, cats_to_add, left_on='label', right_on='name').iterrows():
        seq += 1
        cursor.execute(sql, (seq, v['id'], v['sub_label'], slugify(v['sub_label']), v['sub_imageUrl']))
        f.write(sql % (seq, v['id'], v['sub_label'], slugify(v['sub_label']), v['sub_imageUrl']) + '\n')
        cats2_to_add = cats2_to_add.append({'id': seq, 'section_id': v['id'], 'name': v['sub_label'],
                                            'permalink': slugify(v['sub_label']), 'icon': v['sub_imageUrl']}
                                           , ignore_index=True)
    cat = pd.concat([cats2, cats2_to_add])
    # ['sub_label', 'sub_price', 'sub_imageUrls', 'sub_description', 'sub__references', 'sub_sellerInfo.name',
    #  'sub_sellerInfo._system_Mail',  'subCategories.label', 'id', 'section_id', 'name', 'description', 'permalink'
    # ['id', 'name', 'description', 'quantity', 'aggragated_review', 'number_of_review', 'category_id', 'user_id',
    #  'tax_id', 'date_added', 'permalink', 'specifications', 'photos', 'brand_id', 'condition']
    sql = "INSERT INTO product (id, name, description, quantity, category_id, permalink, photos, user_id, brand_id, date_added)" \
          " VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    seq=0
    pdTry = pd.merge(prods, cat, left_on='subCategories.label', right_on='name')
    for k, v in pdTry.iterrows():
        seq += 1
        desc = v['sub_description'][:999] if len(v['sub_description']) > 1000 else v['sub_description']
        picD = {i:v['sub_imageUrls'][i] for i in range(len(v['sub_imageUrls']))}
        cursor.execute(sql, (seq, v['sub_label'], desc, random.randint(1,5), v['id'],
                             slugify(v['sub_label']), json.dumps(picD), 1, 1, '2019-06-01'))
        f.write(sql % (seq, v['sub_label'], desc, random.randint(1,5), v['id'],
                                     slugify(v['sub_label']), json.dumps(picD), 1, 1, '2013-06-01') + '\n')

print(cat.columns)
print(prods.columns)
print()
# connection.commit()
connection.close()




import json
import urllib.request

from pandas.io.json import json_normalize

raw_json = json.load(open("json_dat_sample.json", "r"))

cat = json_normalize(raw_json['categories']).drop(columns='subCategories')
cat2 = json_normalize(raw_json['categories'], 'subCategories', ['label', 'imageUrl'], record_prefix='sub_').drop(
    columns='sub_listings')

for index, row in cat.iterrows():
    im_path = row['imageUrl']
    urllib.request.urlretrieve('', row['label'] + '.' + im_path.split('.')[-1])
    print(row['imageUrl'])

import json
import re
import urllib.request as req

from pandas.io.json import json_normalize


def slugify(value):
    """
    Normalizes string, converts to lowercase, removes non-alpha characters,
    and converts spaces to hyphens.
    """
    value = re.sub('[^\w\s-]', '', value).strip().lower()
    value = re.sub('[-\s]+', '-', value)
    return value

raw_json = json.load(open("json_dat_sample.json", "r"))

cat = json_normalize(raw_json['categories']).drop(columns='subCategories')
cat2 = json_normalize(raw_json['categories'], 'subCategories', ['label', 'imageUrl'], record_prefix='sub_').drop(
    columns='sub_listings')
cat3 = json_normalize(raw_json['categories'], ['subCategories', 'listings', 'imageUrls'],
                      [['subCategories', 'label'], ['subCategories', 'listings', 'label']])

# os.mkdir('.\\pictures\\main')
# os.mkdir('.\\pictures\\sub_cat')
# os.mkdir('.\\pictures\\products')

# for index, row in cat.iterrows():
#     im_path = row['imageUrl']
#     path_to_save = '.\\pictures\\main\\' + row['label'] + '.' + im_path.split('.')[-1]
#     d = req.Request(im_path, headers={'User-Agent': 'Mozilla/5.0'})
#     f = open(path_to_save, "wb")
#     data = req.urlopen(d).read()
#     f.write(data)
#     f.close()

# for index, row in cat2.iterrows():
#     im_path = row['sub_imageUrl']
#     path_to_save = '.\\pictures\\sub_cat\\' + row['sub_label'] + '.' + im_path.split('.')[-1]
#     d = req.Request(im_path, headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '
#                                                     'AppleWebKit/537.11 (KHTML, like Gecko) '
#                                                     'Chrome/23.0.1271.64 Safari/537.11',
#                                       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#                                       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
#                                       'Accept-Encoding': 'none',
#                                       'Accept-Language': 'en-US,en;q=0.8',
#                                       'Connection': 'keep-alive'})
#     f = open(path_to_save, "wb")
#     data = req.urlopen(d).read()
#     f.write(data)
#     f.close()

counter = 0
for index, row in cat3.iterrows():
    counter = counter % 3
    im_path = row[0]
    path_to_save = '.\\pictures\\products\\' + slugify(row['subCategories.listings.label']) + '_' + str(counter) + '.' + \
                   ('todo' if re.match(r'^(http(s|):\/\/)(.(?!.*\.\w{3,4}$))*$', im_path) else im_path.split('.')[-1])
    d = req.Request(im_path, headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '
                                                    'AppleWebKit/537.11 (KHTML, like Gecko) '
                                                    'Chrome/23.0.1271.64 Safari/537.11',
                                      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                      'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                                      'Accept-Encoding': 'none',
                                      'Accept-Language': 'en-US,en;q=0.8',
                                      'Connection': 'keep-alive'})
    f = open(path_to_save, "wb")
    data = req.urlopen(d).read()
    f.write(data)
    f.close()
    counter = counter + 1

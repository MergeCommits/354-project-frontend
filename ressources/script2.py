import json
import re

from pandas.io.json import json_normalize


def slugify(value):
    """
    Normalizes string, converts to lowercase, removes non-alpha characters,
    and converts spaces to hyphens.
    """
    value = re.sub('[^\w\s-]', '', value).strip().lower()
    value = re.sub('[-\s]+', '-', value)
    return value

jsonStr = open("json_dat_sample.json", "r", encoding="utf-8").read()
raw_json = json.loads(jsonStr)

cat3 = json_normalize(raw_json['categories'], ['subCategories', 'listings', 'imageUrls'],
                       [['subCategories', 'label'], ['subCategories', 'listings', 'label']])



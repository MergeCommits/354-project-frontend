import json
import re

file_i = open("json_dat_sample.json").read()
# ensures all images end with .ext
json_file = json.load(open("json_dat_sample.json"))
for cat in json_file['categories']:
    to_test = cat['imageUrl']
    if re.match(r'^(http(s|):\/\/)(.(?!.*\.\w{3,4}$))*$', to_test):
        print(cat['label'] + ": ")
    sub_cat = cat['subCategories']
    for s_cat in sub_cat:
        to_test = s_cat['imageUrl']
        if re.match(r'^(http(s|):\/\/)(.(?!.*\.\w{3,4}$))*$', to_test):
            print('\t' + s_cat['label'] + ": " + to_test)
        prod = s_cat['listings']
        for listi in prod:
            for to_test in listi['imageUrls']:
                if re.match(r'^(http(s|):\/\/)(.(?!.*\.\w{3,4}$))*$', to_test):
                    print("\t\t" + listi['label'] + ": " + to_test)



file_temp = re.sub(r'(")(\w+)(")(:)', r'\2\4', file_i)

with open("json_dat_sample_cleaned.json", 'w', encoding='utf-8') as file_o:
    file_o.write(file_temp)

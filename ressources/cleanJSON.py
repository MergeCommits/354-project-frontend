import re

file_i = open("ressources/json_dat_sample.json").read()

file_temp = re.sub(r'(")(\w)(")(:)', r'\2\4')

with open("ressources/json_dat_sample_cleaned.json", 'w', encoding='utf-8') as file_o:
    file_o.write(file_temp)

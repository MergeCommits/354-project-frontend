import pandas as pd

print('STATIC MODEL')

main_cats = pd.DataFrame({'key':[1,2,3],'main_cat_label':['A', 'B', 'C']}).set_index('key')
non_flat = [[i,i,i] for i in main_cats.index.to_list()]
sub_cats = pd.DataFrame({'key':[i for i in range(1,3**2+1)] ,'sub_cat_label':(['a','b','c']*3), 'main_cat_fk':[char for sub in non_flat for char in sub]}).set_index('key')
items = pd.DataFrame({'key':[n for n in range(1, 3**3+1)], 'sub_cat_fk':[char for sub in [[i,i,i] for i in sub_cats.iloc[:,0].to_list()] for char in sub]}).set_index('key')
cat_sub_cat = main_cats.join(sub_cats.set_index('main_cat_fk'))#.to_json(orient='records')

cat_sub_cat_items = cat_sub_cat.set_index('sub_cat_label').join(items.reset_index().set_index('sub_cat_fk'))

"""records = 0
inp = ''

while (1==1) :
  print ('enter record ' + str(records + 1) + ' press enter, exit with #' )
  inp = input()
  if inp == '#': 
    break
  
  print ('Main catefory name:')
  main_cat = input()
  print ('Sub Category name:')
  sub_cat = input()
  print('item key')
  sub_cat = input()"""


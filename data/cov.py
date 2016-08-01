#!/usr/bin/env python
from urllib import request 
import json

#url = 'http://pitaka.lk/dict/data/buddhadatta_data.json'
#url = 'http://pitaka.lk/dict/data/sumangala_data.json'
#response = request.urlopen(url)
#obj = json.loads(response.read().decode('utf-8'))



data_file=open('tummodic.json')    
obj = json.load(data_file)

print("[")
for v1, v2 in obj:
    print('["'+v1+'","'+v2+'"],');
print("]")


#print("[")
#for v1, v2, v3 in obj:
#    print('["'+v2+'","'+v3+'"],');
#print("]")

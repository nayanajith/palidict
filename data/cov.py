#!/usr/bin/env python
from urllib import request 
import json

#url = 'http://pitaka.lk/dict/data/buddhadatta_data.json'
url = 'http://pitaka.lk/dict/data/sumangala_data.json'
response = request.urlopen(url)
#print(response.read().decode('utf-8'))
obj = json.loads(response.read().decode('utf-8'))
arr=[]
i=0
print("[")
for v1, v2, v3 in obj:
    print('["'+v2+'","'+v3+'"],');
print("]")

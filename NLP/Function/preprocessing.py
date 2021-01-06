import json
import gensim.downloader as api
from gensim.models import Word2Vec
from collections import *
import re

'''
    load files
'''
with open('./words_dictionary.json', encoding='utf8') as file:
    words_bag = json.load(file)

with open('./prefix.json', encoding='utf8') as file:
    pre_bag = json.load(file)

try:
    model = Word2Vec.load("glove-twitter-25.model")
except:
    model = api.load("glove-twitter-25")
    model.save("glove-twitter-25.model")

def words(s):
    return re.findall(r'\w+', s)

def prefix_candicate(s):
    candicate = []
    for i in range(1, len(s)+1):
        candicate += pre_bag.get(s[:i], [])
    return candicate

def find_root(s):
    candicate = prefix_candicate(s)
    if s not in model.vocab: return 100, 'model can not calculate', 'nan' 

    tmp = []
    for item in candicate:
        for sen in words(item['meanings']):
            if sen in model.vocab: tmp.append( (model.distance(s, sen), len(item['root_word']), item) )
    if not len(tmp): return 100, 'no length', 'nan'
    
    return min(tmp, key = lambda x: (x[0], -x[1]))

def build_root(threshold = 0.5):
    words_root = dict()
    for word in words_bag.keys():
        distance, _, root = find_root(word)
        if distance <= threshold: 
            words_root[word] = root
    json.dump(words_root, open("word_roots.json", "w"), indent=4)

'''
    Running
'''
build_root()

'''
    Testing
'''
test = 'aahed'
print(find_root(test))




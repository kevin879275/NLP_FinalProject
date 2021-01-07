import json
import gensim.downloader as api
from gensim.models import Word2Vec
import re

'''
    load files
'''
# with open('./words_dictionary.json', encoding='utf8') as file:
#     words_bag = json.load(file)

with open('./prefix.json', encoding='utf8') as file:
    pre_bag = json.load(file)

with open('./words_suffix.json', encoding='utf8') as file:
    suffix_bag = json.load(file)

try:
    model = Word2Vec.load("fasttext-wiki-news-subwords-300.model")
except:
    model = api.load("fasttext-wiki-news-subwords-300")
    model.save("fasttext-wiki-news-subwords-300.model")

def words(s):
    return re.findall(r'\w+', s)

def prefix_candicate(s):
    candicate = []
    for i in range(1, len(s)+1):
        candicate += pre_bag.get(s[:i], [])
    return candicate

def suffix_candicate(s):
    candicate = []
    for i in range(len(s)):
        candicate += suffix_bag.get(s[i:], [])
    return candicate

def find_root(s, howcandicate):
    if s not in model.vocab: return 100, 'model can not calculate', 'nan' 

    root_key = 'root_word' if howcandicate == prefix_candicate else 'suffix' 
    candicate = howcandicate(s)
    
    tmp = []
    for item in candicate:
        for sen in words(item['meanings']):
            if sen in model.vocab: tmp.append( (model.distance(s, sen), len(item[root_key]), item) )
    if not len(tmp): return 100, 'no length', 'nan'
    
    return min(tmp, key = lambda x: (x[0], -x[1]))

def build_root(dataset, threshold = 0.7, rootfunc = prefix_candicate):
    words_root = dict()
    for word in dataset:
        distance, _, root = find_root(word, rootfunc)
        if distance <= threshold: 
            words_root[word] = root
    return words_root

'''
    Running
'''
json.dump(build_root(dataset = model.vocab, threshold=0.7), open("fasttext_roots.json", "w"), indent=4)
json.dump(build_root(dataset = model.vocab, threshold=0.7, rootfunc=suffix_candicate), open("fasttext_suffix.json", "w"), indent=4)

'''
    Testing
'''
test = 'aahed'
print(find_root(test, howcandicate=prefix_candicate))
print(find_root(test, howcandicate=suffix_candicate))




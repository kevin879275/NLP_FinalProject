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
    model = Word2Vec.load("./fasttext-wiki-news-subwords-300.model")
except:
    model = api.load("fasttext-wiki-news-subwords-300")
    model.save("fasttext-wiki-news-subwords-300.model")

def words(s):
    return re.findall(r'\w+', s)

def prefixCandicate(s, idx = -1):
    candicate = []
    lg = len(s) + 1 if idx < 0 else idx
    for i in range(1, lg):
        for val in pre_bag.get(s[:i], []):
            candicate.append((0, val))
    return candicate

def allPrefixCandicate(s, idx = -1):
    candicate = []
    for k in range(len(s)):
        for i in range(k+1, len(s)+1):
            for val in pre_bag.get(s[k:i], []):
                candicate.append((k, val))
    return candicate

def suffixCandicate(s, idx = -1):
    candicate = []
    lg = 0 if idx < 0 else idx+1
    for i in range(lg, len(s)):
        for val in suffix_bag.get(s[i:], []):
            candicate.append((i, val)) 
    return candicate

def findRoot(s, howcandicate, idx = -1):
    if s not in model.vocab: return 100, 'model can not calculate', 'nan', 'nan'

    root_key = 'root_word' if howcandicate != suffixCandicate else 'suffix' 
    candicate = howcandicate(s, idx)
    
    tmp = []
    for idx, item in candicate:
        for sen in words(item['meanings']):
            if sen in model.vocab: tmp.append( (model.distance(s, sen), len(item[root_key]), idx, item) )
    if not len(tmp): return 100, 'no length', 'nan', 'nan'
    
    return min(tmp, key = lambda x: (x[0], -x[1], x[2]))

def buildRoot(dataset, threshold = 0.6):
    words_root = dict()
    for word in dataset:
        word_root = dict()
        distance, _, idx, root = findRoot(word, allPrefixCandicate)
        if idx == 0 and distance <= threshold: word_root['prefix'] = root
        elif distance <= threshold:
            word_root['root'] = root
            if idx != 'nan':
                distance, _, _, root = findRoot(word, prefixCandicate, idx)
                if distance <= threshold: word_root['prefix'] = root
        idx = idx if idx != 'nan' else -1
        distance, _, _, root = findRoot(word, suffixCandicate, idx)
        if distance <= threshold: word_root['suffix'] = root
        if len(word_root): words_root[word] = word_root
    return words_root

'''
    Running
'''
json.dump(buildRoot(dataset = model.vocab, threshold=0.7), open("fasttext_all.json", "w"), indent=4)

'''
    Testing
'''
test = 'construction'
print(findRoot(test, howcandicate=allPrefixCandicate))
# print(findRoot(test, howcandicate=suffixCandicate))




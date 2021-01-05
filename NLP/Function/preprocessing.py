import json
import gensim.downloader as api
from gensim.models import Word2Vec

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

def split_words(s):
    return s.split(',')

def segment(s):
    dc = dict()
    for i in range(1, len(s)+1):
        pre = s[:i]
        if pre in pre_bag:
            meaning = split_words(pre_bag[pre]['meanings'])[0]
            dc[pre] = meaning
    return dc

def find_root(s):
    dc = segment(s)
    return min([(model.distance(s, v), k) for k, v in dc.items()], key = lambda x: x[0])

test = 'abandon'
print(find_root(test))

# # test 10
# for wd in list(words_bag.keys())[:1]:
#     print(wd)



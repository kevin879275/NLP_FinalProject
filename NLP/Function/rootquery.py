import os
import json


def fastfind_root(s):
    parent = os.path.dirname(os.path.realpath(__file__))
    path = os.path.dirname(parent) + '/Data/fasttext_roots.json'

    roots = json.load(open(path, encoding='utf-8'))
    if s in roots:
        tmp = roots[s]
        tmp['status'] = 'OK'
        return tmp

    return {'status': 'Not Found'} 

# print(fastfind_root('pre'))
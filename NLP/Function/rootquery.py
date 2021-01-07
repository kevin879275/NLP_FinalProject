import os
import json


def fastfind_root(s):
    parent = os.path.dirname(os.path.realpath(__file__))
    path = os.path.dirname(parent) + '/Data/fasttext_roots.json'

    roots = json.load(open(path, encoding='utf-8'))
    if s in roots:
        roots[s]['status'] = 'OK'
        return roots[s]

    return {'status': 'Not Found'} 

def fastfind_suffix(s):
    parent = os.path.dirname(os.path.realpath(__file__))
    path = os.path.dirname(parent) + '/Data/fasttext_suffix.json'

    roots = json.load(open(path, encoding='utf-8'))
    if s in roots: 
        roots[s]['status'] = 'OK'
        return roots[s]

    return {'status': 'Not Found'} 

# print(fastfind_root('pre'))
# print(fastfind_suffix('pre'))

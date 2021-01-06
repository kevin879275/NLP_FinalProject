import os
import json


def fastfind_root(s):
    parent = os.path.dirname(os.path.realpath(__file__))
    path = os.path.dirname(parent) + '/Data/word_roots.json'

    roots = json.load(open(path, encoding='utf-8'))
    if s in roots:
        return 'OK', roots[s]

    return 'Not Found', {} 
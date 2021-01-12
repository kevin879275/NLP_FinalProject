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

def fastfind_all(s):
    parent = os.path.dirname(os.path.realpath(__file__))
    path = os.path.dirname(parent) + '/Data/fasttext_all.json'

    roots = json.load(open(path, encoding='utf-8'))
    res = {
        'prefix': {'status': 'Not Found'},
        'root': {'status': 'Not Found'},
        'suffix': {'status': 'Not Found'}
    }
    if s in roots:
        root = roots[s]
        for name in ['prefix', 'root', 'suffix']:
            try:
                root[name]['status'] = 'OK'
                res[name] = root[name]
            except:
                res[name] = {'status': 'Not Found'} 
    return res

if __name__ == "__main__":
    print(fastfind_root('international'))
    print(fastfind_suffix('international'))
    print(fastfind_all('international'))

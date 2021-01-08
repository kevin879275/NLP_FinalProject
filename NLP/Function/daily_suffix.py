import json
import random
import os


def getDailySuffix():
    parent = os.path.dirname(os.path.realpath(__file__))

    path = os.path.dirname(parent) + '/Data/words_suffix.json'

    res = json.load(open(path, encoding='utf-8'))

    key, value = random.choice(list(res.items()))

    return value

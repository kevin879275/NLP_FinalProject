import json
import random
import os
from linggle import Linggle


def getDailyVoc():
    parent = os.path.dirname(os.path.realpath(__file__))

    path = os.path.dirname(parent) + '/Data/senior_voc.json'

    res = json.load(open(path, encoding='utf-8'))

    key, value = random.choice(list(res.items()))

    linggle = Linggle()

    value['example'] = linggle.get_example(value['voc'])[0]
    return value

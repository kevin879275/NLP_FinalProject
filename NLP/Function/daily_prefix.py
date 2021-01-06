import json
import random
import os


def getDailyPrefix():
    parent = os.path.dirname(os.path.realpath(__file__))

    path = os.path.dirname(parent) + '/Data/prefix.json'

    res = json.load(open(path, encoding='utf-8'))

    key, value = random.choice(list(res.items()))

    linggle = Linggle()

    return(value['voc'] + " " + value['data'] + '\n' +
           linggle.query('_ ' + value['voc'])[0][0])

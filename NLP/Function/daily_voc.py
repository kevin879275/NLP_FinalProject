import json
import random
import os
from linggle import Linggle

# 當前檔案的路徑

# 獲取當前檔案路徑# pwd = os.getcwd(__file__)


def getDailyVoc():
    parent = os.path.dirname(os.path.realpath(__file__))

    path = os.path.dirname(parent) + '/Data/7000.json'

    res = json.load(open(path, encoding='utf-8'))

    key, value = random.choice(list(res.items()))

    linggle = Linggle()

    #print(value['voc'] + " " + value['data'])

    return value['voc'] + " " + value['data'] + '\n' + linggle.query('_ ' + value['voc'][0][0])

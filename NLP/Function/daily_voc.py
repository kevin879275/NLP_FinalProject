import json
import random
import os

# 當前檔案的路徑

# 獲取當前檔案路徑# pwd = os.getcwd(__file__)


def getDailyVoc():
    parent = os.path.dirname(os.path.realpath(__file__))

    path = os.path.dirname(parent) + '/Data/7000.json'

    res = json.load(open(path, encoding='utf-8'))

    key, value = random.choice(list(res.items()))

    print(value['voc'] + " " + value['data'])

    return value['voc'] + " " + value['data']
# # 當前檔案的父路徑

# print(pwd)

# father_path = os.path.abspath(os.path.dirname(pwd)+os.path.sep+".")

# print(father_path)

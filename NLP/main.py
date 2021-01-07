import sys
import json
from linggle import Linggle
import Function.daily_voc
import Function.daily_prefix
import Function.rootquery

function = sys.argv[1]
args = sys.argv[2:]

if function == '每日一字':
    print(json.dumps(Function.daily_voc.getDailyVoc()))

elif function == '每日一字根':
    res = Function.daily_prefix.getDailyPrefix()
    print(json.dumps(res))

elif function == '字根查詢':
    voc = args[0]
    print(Function.rootquery.fastfind_root(voc))

elif function == 'linggle':
    voc = args[0]
    linggle = Linggle()
    print(linggle.query(voc))

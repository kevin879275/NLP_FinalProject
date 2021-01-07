import sys
import json
from linggle import Linggle
import Function.daily_voc
import Function.daily_prefix
import Function.rootquery

function = sys.argv[1]
args = sys.argv[2:]

if function == '每日一字':
    print(json.dumps(Function.daily_voc.getDailyVoc()), flush=True)

elif function == '每日一字根':
    res = Function.daily_prefix.getDailyPrefix()
    print(json.dumps(res), flush=True)

elif function == '字根查詢':
    voc = args[0]
    print(json.dumps(Function.rootquery.fastfind_root(voc)), flush=True)

elif function == '字尾查詢':
    voc = args[0]
    print(json.dumps(Function.rootquery.fastfind_suffix(voc)), flush=True)

elif function == 'linggle':
    voc = args[0]
    linggle = Linggle()
    print(linggle.query(voc), flush=True)

elif function == '每日一字尾':
    print(json.dumps(Function.daily_suffix.getDailySuffix()), flush=True)

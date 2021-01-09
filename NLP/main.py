import sys
import json
from linggle import Linggle
import Function.daily_voc
import Function.daily_prefix
import Function.rootquery
import Function.daily_suffix
import Function.pattern_collections


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
    print(json.dumps(linggle.query(voc)), flush=True)

elif function == '每日一字尾':
    print(json.dumps(Function.daily_suffix.getDailySuffix()), flush=True)

elif function == '拼字建議':
    voc = args[0]
    print(json.dumps(Function.pattern_collections.spellSuggest(voc)), flush=True)

elif function == '句子判斷':
    sen = ' '.join(args)
    print(json.dumps(Function.pattern_collections.sentimentAndSure(sen)), flush=True)
import sys
import json
import Function.daily_voc
import Function.daily_prefix

function = sys.argv[1]

if function == '每日一字':
    print(Function.daily_voc.getDailyVoc())

elif function == '每日一字根':
    pass

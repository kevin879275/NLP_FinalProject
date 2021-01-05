import sys
import json
import Function.daily_voc

function = sys.argv[1]

if function == '每日一字':
    print(Function.daily_voc.getDailyVoc())

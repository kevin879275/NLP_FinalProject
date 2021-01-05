import sys
import json
import Function.daily_voc

Function = sys.argv[1]

if Function == '每日一字':
    print(Function.daily_voc.getDailyVoc())

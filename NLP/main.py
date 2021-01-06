import sys
import json
import Function.daily_voc
import Function.daily_prefix

function = sys.argv[1]

if function == '每日一字':
    print(Function.daily_voc.getDailyVoc())

elif function == '每日一字根':
    res = Function.daily_prefix.getDailyPrefix()
    for data in res:
        print('root_word : ' + data['root_word'] + '\n'
              + 'meanings : ' + data['meanings'] + '\n'
              + 'origin : ' + data['origin'] + '\n'
              + 'examples : ' + '\n' + '\n'.join(data['examples_definitions']))

import sys
import json
import Function.daily_voc
import Function.daily_prefix
import Function.rootquery

function = sys.argv[1]
args = sys.argv[2:]

if function == '每日一字':
    print(Function.daily_voc.getDailyVoc())

elif function == '每日一字根':
    res = Function.daily_prefix.getDailyPrefix()
    for data in res:
        print('root_word : ' + data['root_word'] + '\n'
              + 'meanings : ' + data['meanings'] + '\n'
              + 'origin : ' + data['origin'] + '\n'
              + 'examples : ' + '\n' + '\n'.join(data['examples_definitions']))

elif function == '字根查詢':
    voc = args[0]
    status, res = Function.rootquery.fastfind_root(voc)
    print('status: {}, {}'.format(status, res))

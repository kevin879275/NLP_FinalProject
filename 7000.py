import json
f = open('7000.txt', 'r')
words = f.read()

word_list = words.split('\n')

res = {}

for word in word_list:
    _word = word.split(' ')
    if len(_word) < 2:
        continue
    if _word[0][0] == '*':
        _word[0] = _word[0][1:]

    res[_word[0]] = {'voc': _word[0], 'data': _word[1]}

json.dump(res, open("7000.json", "w"), indent=4, ensure_ascii=False)

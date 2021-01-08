import sys
from os.path import abspath, dirname
sys.path.append(abspath(dirname(__file__)))

from pattern.en import parse, Sentence
from pattern.en import modality
from pattern.en import suggest


def spell_suggest(s): return suggest(s)

def fact_p(text):
    sent = parse(text, lemmata=True)
    sent = Sentence(sent)
    return modality(sent)

if __name__ == "__main__":
    print(spell_suggest('shiiit'))
    print(fact_p('everyone is the best coder'))
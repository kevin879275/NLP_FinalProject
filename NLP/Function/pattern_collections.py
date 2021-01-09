import sys
from os.path import abspath, dirname
sys.path.append(abspath(dirname(__file__)))

from pattern.en import parse, Sentence
from pattern.en import modality
from pattern.en import suggest


def spell_suggest(s): return suggest(s)

def degree_of_sure(text):
    sent = parse(text, lemmata=True)
    sent = Sentence(sent)
    return modality(sent)

if __name__ == "__main__":
    print(spell_suggest('shiiit'))
    print(degree_of_sure('sun is hot'))
import sys
from os.path import abspath, dirname
sys.path.append(abspath(dirname(__file__)))

from pattern.en import parse, Sentence
from pattern.en import modality
from pattern.en import suggest
from pattern.en import sentiment


def spellSuggest(s): return suggest(s)

def sentimentAndSure(text):
    sent = parse(text, lemmata=True)
    sent = Sentence(sent)
    senti, subject = sentiment(text)
    return modality(sent), senti, subject

if __name__ == "__main__":
    print(spellSuggest('shiiit'))
    print(sentimentAndSure('sun is hot'))
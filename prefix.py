import requests
import json
from bs4 import BeautifulSoup
response = requests.get(
    "https://www.learnthat.org/pages/view/roots.html")
soup = BeautifulSoup(response.text, "html.parser")
print(soup.prettify())  # 輸出排版後的HTML內容

res = {}
tr_list = soup.select(".root_meanings tr")
for tr in tr_list[2:]:
    td = tr.select("td")
    root_word = td[1].text
    meanings = td[2].text
    origin = td[3].text
    examples_definitions = td[4].text
    res[root_word] = {"root_word": root_word, "meanings": meanings,
                      "origin": origin, "examples_definitions": examples_definitions}


json.dump(res, open("prefix.json", "w"), indent=4)

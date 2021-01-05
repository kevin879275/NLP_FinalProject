import requests
import json
from bs4 import BeautifulSoup
from collections import defaultdict
response = requests.get(
    "https://www.learnthat.org/pages/view/roots.html")
soup = BeautifulSoup(response.text, "html.parser")
# print(soup.prettify())  # 輸出排版後的HTML內容

res = defaultdict(list)
l = []
temp_l = []
tr_list = soup.select(".root_meanings tr")
for tr in tr_list[2:]:
    td = tr.select("td")

    temp = td[1].text.split(", ")
    for i in temp :
        l = i.split("/")
        if len(l) > 1 :
            temp_l.append(l[0])
            tmp_string = l[0] + l[1]
            if len(l) > 2 :
                temp_l.append(tmp_string)
                tmp_string = l[0] + l[2]
        else :
            tmp_string = i
        temp_l.append(tmp_string)
    
    root_word = td[1].text
    meanings = td[2].text
    origin = td[3].text
    examples_definitions = td[4].text
    examples_definitions2 = examples_definitions.replace("\n","").split("; ")
    for i in range(len(temp_l)) :
        res[temp_l[i]].append({"root_word": temp_l[i], "meanings": meanings,
                               "origin": origin, "examples_definitions": examples_definitions2})
             
    temp_l = []

json.dump(res, open("prefix.json", "w"), indent=4)
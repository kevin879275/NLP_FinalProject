import requests
from bs4 import BeautifulSoup
response = requests.get(
    "https://www.learnthat.org/pages/view/roots.html")
soup = BeautifulSoup(response.text, "html.parser")
print(soup.prettify())  # 輸出排版後的HTML內容

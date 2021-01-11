# NLP BOT
### Dependency
1. nodejs :     "chalk": "^3.0.0",
    "discord.js": "^11.6.3",
    "firebase-admin": "^8.11.0",
    "python-shell": "^2.0.3",
    "slashes": "^2.0.2"
2. python : linggle, nltk

### Functions
#### Daily Vocabularay
Show a random vocabularay with meanings and examples in channels everyday.
#### Daily Root/Prefix
Show a random root/prefix with meanings and examples in channels everyday.
#### Daily Suffix
Show a random suffix with meanings and examples in channels everyday.
#### Chinese Scrabble/Generator
Send a random vocabulary start with last character of lastMessage in specific channels.
#### Sentence degree of certainty/sentiment/subjectivity 
Get sentence degree of certainty/sentiment/subjectivity 
##### alias(also can be command):
1. acheck
2. ??
##### command:
```shell
acheck I'm going to kill you soon
```
#### Root/Prefix Query
Get the root/prefix which is same meaning of your input.
##### alias(also can be command):
1. rq
2. rootQuery
##### command:
```shell
arootQuery vocabulary
```
#### Suffix Query
Get the suffix which is same meaning of your input.
##### alias(also can be command):
1. sq
2. suffixQuery
##### command:
```shell
asuffixQuery vocabulary
```
#### Linggle Ngram Query
Get the frequency of your query. This method can select how many topmost results you want to see by optional argument.
##### alias(also can be command):
1. l
2. lq
3. linggle
4. linggleQuery
##### command:
```shell
alinggle LinggleQueryString
```
```shell
alinggle ReturnTopNumber(-1 is all) LinggleQueryString
```
see [Linggle](https://linggle.com/)









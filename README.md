# NLP BOT
###### tags: `Discord` `Nature Language Processing` 
## Introduction
This is a discord bot contains various NLP functions for NLP crouse final project.

## Useage
All commands should start with prefix, default=a, you setting in data/settings.json.

## Dependency
1. nodejs :     "chalk": "^3.0.0",
    "discord.js": "^11.6.3",
    "firebase-admin": "^8.11.0",
    "python-shell": "^2.0.3",
    "slashes": "^2.0.2"
2. python : linggle, nltk

## Functions
### Daily Vocabularay
Show a random vocabularay with meanings and examples in channels everyday.
##### Results
![](https://i.imgur.com/DXdTWZO.png)

### Daily Root/Prefix
Show a random root/prefix with meanings and examples in channels everyday.
##### Results
![](https://i.imgur.com/ypvnysr.png)
### Daily Suffix
Show a random suffix with meanings and examples in channels everyday.
##### Results
![](https://i.imgur.com/i6mTls8.png)

### Chinese/English Scrabble/Generator
Send a random vocabulary start with last character of lastMessage in specific channels.
##### Results
1. Chinese scrabble
![](https://i.imgur.com/TVbLvBg.png)
2. English genrate
![](https://i.imgur.com/6tDOsr4.png)


###  level of certainty/sentiment/subjectivity of sentence
Get sentence degree of certainty/sentiment/subjectivity 
##### alias(also can be command):
1. sentenceCheck
2. check
3. sc
4. sv
5. sentenceVerify
##### command:



```shell
acheck I'm going to kill you soon
```


##### results:
![](https://i.imgur.com/DHsZhb8.png)
![](https://i.imgur.com/lhfcIDn.png)
![](https://i.imgur.com/dabwVs5.png)

### Root/Prefix Query
Get the root/prefix which is same meaning of your input.
##### alias(also can be command):
1. rq
2. rootQuery
##### command:
```shell
arootQuery vocabulary
```
##### results:
![](https://i.imgur.com/EFH9csJ.png)

### Suffix Query
Get the suffix which is same meaning of your input.
##### alias(also can be command):
1. sq
2. suffixQuery
##### command:
```shell
asuffixQuery vocabulary
```
##### results:
![](https://i.imgur.com/lltCbup.png)

### Linggle Ngram Query
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

##### results:
![](https://i.imgur.com/l4ciPcc.png)
![](https://i.imgur.com/K5O1gNM.png)


### Spell recommend

##### alias:
1. ss
2. spellCheck
3. spell
##### command:
```shell
aspellCheck vocabulary
```


##### results:
![](https://i.imgur.com/q3ZL0xt.png)









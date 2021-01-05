const Path=require("../js/PathSetting");
const {Functions} =require(`${Path.jsFolder}botHandler.js`);
const fs=require("fs");
const readline = require('readline');
const {random}=require(`${Path.jsFolder}util`);
class Scrabble extends Functions
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="scrabble";
        this.defaultSetting.alias=[];
        this.defaultSetting.dictName=["chinese.txt"];
        this.defaultSetting.learn=true;
        this.defaultSetting.learnOutputDictName="learn.txt";
        this.defaultSetting.replyOnmessage=false;
        this.defaultSetting.waitReply=true;
        this.defaultSetting.waitFor=60000;
        this.defaultSetting.randomWaitForMax=90000;
        this.defaultSetting.delay=1000;
        this.defaultSetting.randomDelayMax=2000;
        this.defaultSetting.selfScrabbleInfinite=true;
        this.defaultSetting.channels=["692785986823782411"];
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
        this.loadDict();
        this.channelSettings={}
        for(let id of this.settings.channels)
        {
            this.channelSettings[id]={tid:undefined,stopFunc:this.settings.selfScrabbleInfinite?clearInterval:clearTimeout};
        }
    }
    loadDict()
    {
        const dict={};
        let dictNames=[...this.settings.dictName];
        if(this.settings.learn)
            if(dictNames.indexOf(this.settings.learnOutputDictName)==-1)
                dictNames.push(this.settings.learnOutputDictName);
        for(let dictName of dictNames)
        {
            let path=`${Path.dictFolder}${dictName}`;
            if(!fs.existsSync(path))continue;
            let inputStream = fs.createReadStream(path);
            let lineReader = readline.createInterface({ input: inputStream });
            this.dict=dict;
            lineReader.on('line', function(line) {
                if(!dict[line[0]])
                    dict[line[0]]=[line];
                else
                    if(dict[line[0]].indexOf(line)==-1)dict[line[0]].push(line);
            });
        }
        
    }
    onnewWord(word)
    {
        if(!this.settings.learn)return;
        if(!this.learnOstream)
            this.learnOstream=fs.createWriteStream(`${Path.dictFolder}${this.settings.learnOutputDictName}`,{flags:"a+"});
        this.learnOstream.write(`${word}\n`);
        if(!this.dict[word[0]])
            this.dict[word[0]]=[word];
        else
            this.dict[word[0]].push(word);
    }
    scrabbleToChannel(channel)
    {
        if(!channel.lastMessage)return;
        let find=this.findMatch(channel.lastMessage.content)
        let lid=channel.lastMessage.id;
        if(find&&find.length<5)
        {
            setTimeout(()=>{
                if(lid==channel.lastMessage.id)
                    this.scrabbleToChannel(channel);
            },1000*(5-find.length));

            return;
        }
        if(!this.randomMatch(channel.lastMessage.content))
        {
            this.channelSettings[channel.id].stopFunc(this.channelSettings[channel.id].tid);
            return;
        }
        channel.send(this.randomMatch(channel.lastMessage.content));
        
    }
    onready()
    {

    }
    regularizeString(string)
    {
        return string.replace(/^[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\ |\=|\||\\|\[|\]|\{|\}|\;|\:|\”|\’|\,|\<|\.|。|\>|\/|\?|x|X|w]+/,"").replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\ |\=|\||\\|\[|\]|\{|\}|\;|\:|\”|\’|\,|\<|\.|。|\>|\/|\?|x|X|w]+$/,"");
    }
    findMatch(string)
    {
        let lastword=string[string.length-1],matches=this.dict[lastword];
        return matches;
    }
    randomMatch(string)
    {
        let content=this.regularizeString(string);
        let matches=this.findMatch(content);
        if(!matches)return undefined;
        return matches[random(matches.length)];
    }
    onmessage({cmd,args,msg})
    {
        if(!this.verifys(msg))return;
        
        let content=this.regularizeString(msg.content);
        if(!this.dict[content[0]]||this.dict[content[0]].indexOf(content)==-1)
            this.onnewWord(content);
        let chSettings=this.channelSettings[msg.channel.id];
        if(chSettings&&chSettings.tid&&chSettings.stopFunc)
            chSettings.stopFunc(chSettings.tid);
        if(this.settings.waitReply)
        {
            if(this.settings.selfScrabbleInfinite)
            {
                chSettings.stopFunc=clearInterval;
                chSettings.tid=setInterval(()=>this.scrabbleToChannel(msg.channel),random(this.settings.randomWaitForMax)+this.settings.waitFor);
            }
            else
            {
                chSettings.stopFunc=clearTimeout;
                chSettings.tid=setTimeout(()=>this.scrabbleToChannel(msg.channel),random(this.settings.randomWaitForMax)+this.settings.waitFor);
            }
        }
       
        if(this.settings.replyOnmessage)
            if(this.bot.user.id!=msg.author.id)
            {
                if(!this.channelSettings[msg.channel.id])
                {
                    this.channelSettings[msg.channel.id]={};
                    if(this.channelSettings[msg.channel.id].onmsgTid)
                        clearTimeout(this.channelSettings[msg.channel.id].onmsgTid);
                }
                this.channelSettings[msg.channel.id].onmsgTid=setTimeout(()=>this.scrabbleToChannel(msg.channel),random(this.settings.randomDelayMax)+this.settings.delay);
            }
                
            
        
    }
}
module.exports=Scrabble;
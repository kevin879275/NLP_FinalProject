const Path=require("../PathSetting");
const {Functions} =require(`${Path.jsFolder}botHandler.js`);
const fs=require("fs");
const readline = require('readline');
const {random}=require(`${Path.jsFolder}util`);
const { PythonShell } = require('python-shell')
class Scrabble extends Functions
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="nlp";
        this.defaultSetting.alias=[];
        
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();;
        this.channelSettings={}
        for(let id of this.settings.channels)
        {
            this.channelSettings[id]={tid:undefined,stopFunc:this.settings.selfScrabbleInfinite?clearInterval:clearTimeout};
        }
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
    onmessage({cmd,args,msg,content,channel,author,member})
    {
        if(!this.verifys(msg))return;
        
        content=this.regularizeString(msg.content);
        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["每日一字"]}, (err, data) => {
            if(err)
                console.log(err);
            //const parsedString = JSON.parse(data)
            channel.send(data);
            //res.json(parsedString)
          })
        
    }
}

module.exports=Scrabble;
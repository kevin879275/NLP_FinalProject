const Path=require("../js/PathSetting");
const {Functions} =require(`${Path.jsFolder}botHandler.js`);
const {random}=require(`${Path.jsFolder}util`);
const { PythonShell } = require('python-shell');
const { addSlashes, stripSlashes } = require('slashes');
class Scrabble extends Functions
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="nlp";
        this.defaultSetting.alias=[];
        this.defaultSetting.checkPeriod=1;//min
        this.defaultSetting.sendHour=0;
        this.defaultSetting.sendMin=0;
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();;
        this.channelSettings={}
        for(let id of this.settings.channels)
        {
            this.channelSettings[id]={tid:undefined,stopFunc:this.settings.selfScrabbleInfinite?clearInterval:clearTimeout};
        }
    }
 
  
    tick()
    {
        var dt = new Date();
        var h=dt.getHours();
        var m=dt.getMinutes();
        // if(h!=this.settings.sendHour||m!=this.settings.sendMin)
        // {return;}
        for(let ch of this.channels)
        {
            PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["每日一字"]}, (err, data) => {
                if(err)
                    console.log(err);

                var voc=JSON.parse(stripSlashes(data[0]));
                
                var embed =
                {
                    color:0x0099ff,
                    author:{
                        name:voc.voc
                    },
                    title:voc.data,
                    description:voc.example

                }
                
                
                ch.send({embed:embed});
                //res.json(parsedString)
              })
            PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["每日一字根"]}, (err, data) => {
                if(err)
                    console.log(err);
                var dicts = JSON.parse(data)
                for(let prefix of dicts)
                {
                    var embed =
                    {
                        color:0x0099ff,
                        author:{
                            name:"Daily Prefix"
                        },
                        title:prefix.root_word,
                        description:`${prefix.meanings}`

                    }

                    embed.fields=[{name:"---------",value:"examples : "}]
                    for(let exp of prefix.examples_definitions)
                    {
                        let [voc,sent] = exp.split(" - ");
                        sent = sent || "no sentence example";
                        embed.fields.push({name:voc,value:sent})
                    }
                    
                }

                ch.send({embed:embed});
                //res.json(parsedString)
              })
              PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["每日一字尾"]}, (err, data) => {
                if(err)
                    console.log(err);
                var dicts = JSON.parse(data)
                for(let prefix of dicts)
                {
                    var embed =
                    {
                        color:0x0099ff,
                        author:{
                            name:"Daily Suffix"
                        },
                        title:prefix.root_word,
                        description:`${prefix.meanings}`

                    }

                    embed.fields=[{name:`ex. `,value:prefix.example}]
               
                    
                }

                ch.send({embed:embed});
                //res.json(parsedString)
              })
        }
    }
    onready()
    {
        this.channels=[]
        for(let id of this.settings.channels)
        {
            var channel=this.bot.channels.find(ch=>ch.id===id)
            this.channels.push(channel)
        }
        this.tId=setInterval(()=>this.tick(),this.settings.checkPeriod*1000*60);
        this.tick()
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
        
        
        
        
        
    }
}

module.exports=Scrabble;
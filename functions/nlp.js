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
        if(h!=this.settings.sendHour||m!=this.settings.sendMin)return;
        this.sendVocs();
    }
    sendVocs()
    {
        
        for(let ch of this.channels)
        {
            PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["每日一字"]}, (err, data) => {
                if(err)
                    console.log(err);
                if(!data)
                    return; // this is for data == null bug but i am not sure why main.py send back null print to stdout
                var voc=JSON.parse(stripSlashes(data[0]));
                
                var embed =
                {
                    color:0x0099ff,
                    title:`${voc.voc} : ${voc.data}`,
                    description:voc.example || ":x:",
                    footer: {text:"Daily Vocabulary"}


                }
                
                try{
                
                ch.send({embed:embed});
                ch.send({files:[{attachment: `https://myweb.ntut.edu.tw/~t105590029/php/googleTTSproxy.php?Text=${voc.voc}&Lang=en`,name:`${voc.voc}.mp3`}]})
                }
                catch(e)
                {
                    console.log(e.message)
                }
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
                        title:prefix.root_word||":x:",
                        description:`${prefix.meanings}`||":x:",
                        footer: {text:"Daily Prefix/Root"}
                    }

                    embed.fields=[{name:"---------",value:"examples : "}]
                    for(let exp of prefix.examples_definitions)
                    {
                        let [voc,sent] = exp.split(" - ");
                        sent = sent || "no sentence example";
                        embed.fields.push({name:voc||":x:",value:sent})
                    }
                    
                }
                try{
                    ch.send({embed:embed});
                }
                catch(e)
                {
                    console.log(e.message)
                }
                //res.json(parsedString)
              })
              PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["每日一字尾"]}, (err, data) => {
                if(err)
                    console.log(err);
                var dicts = JSON.parse(data)
                for(let suffix of dicts)
                {
                    var embed =
                    {
                        color:0x0099ff,
                        title:suffix.suffix||":x:",
                        description:`${suffix.meanings}`||":x:",
                        footer: {text:"Daily Suffix"}

                    }

                    embed.fields=[{name:`ex. `,value:suffix.example}]
               
                    
                }
                try{
                    ch.send({embed:embed});
                }
                catch(e)
                {
                    console.log(e.message)
                }
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
        this.sendVocs()
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
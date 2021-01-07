const Path=require("../js/PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
const {random,progressGen}=require(`${Path.jsFolder}util`);
const { PythonShell } = require('python-shell');
const { addSlashes, stripSlashes } = require('slashes');
const { Util } = require("discord.js");
class Linggle extends Cmd
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="liggle";
        this.defaultSetting.alias=["q"];
        this.defaultSetting.limit=10;
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();;
        this.channelSettings={}

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
        var limit=this.settings.limit;
        var startSlice=1;
        if(args[0]&&!isNaN(parseInt(args[0])))
        {
            limit=parseInt(args[0]);
            startSlice=2;
        }
            
        args=content.split(" ").slice(startSlice).join(" ")
        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["linggle",args]}, (err, data) => {
            if(err)
                console.log(err);
            var ngrams=JSON.parse(data);
            var max=1;
            if(ngrams[0])
                max=ngrams[0][1];
            var embed =
            {
                color:0x0099ff,
                author:{
                    name:`${args}`
                },
                fields:[]
                

            }
            limit=(limit==-1||limit>=ngrams.length)?ngrams.length:limit;
            for(var i=0;i<limit;i++)
            {
                var ngram=ngrams[i];
                embed.fields.push({name:`${ngram[0]}`,value:`${progressGen(ngram[1],max,{display:"🟧",empty:"⬛",showPercent:false,showValue:true})}`});   
            }
            channel.send({embed:embed});
            
          })
        
        
        
        
    }
}

module.exports=Linggle;
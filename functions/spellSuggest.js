const Path=require("../js/PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
const {random,progressGen}=require(`${Path.jsFolder}util`);
const { PythonShell } = require('python-shell');
const { addSlashes, stripSlashes } = require('slashes');
const { Util } = require("discord.js");
class SpellSuggest extends Cmd
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="spellSuggest";
        this.defaultSetting.alias=["ss","spellCheck","spell"];
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
    onmessage({cmd,args,msg,content,channel,author,member})
    {
        if(!this.verifys(msg))return;
        var limit=this.settings.limit;
        var startSlice=1;

            
        var arg=content.split(" ").slice(startSlice).join(" ")
        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["拼字建議",arg]}, (err, data) => {
            if(err)
                console.log(err);
            //data="[0.73]";
            var result=JSON.parse(data[0]);
            var embed =
            {
                color:0x0099ff,
                author:{
                    name:`${arg}`
                },
                title:"-------",
                description:"suggestions:",
                fields:[]
            }
            for(let [voc,P] of result)
            {
                embed.fields.push({name:voc,value:`${progressGen(P,1,{display:'🟧',empty:'⬛'})}`});
            }
            
            channel.send({embed:embed});
            
          })
        
        
        
        
    }
}

module.exports=SpellSuggest;
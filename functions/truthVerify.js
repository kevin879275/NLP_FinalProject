const Path=require("../js/PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
const {random,progressGen}=require(`${Path.jsFolder}util`);
const { PythonShell } = require('python-shell');
const { addSlashes, stripSlashes } = require('slashes');
const { Util } = require("discord.js");
class TruthVerify extends Cmd
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="truthVerify";
        this.defaultSetting.alias=["check","truth","tc","tf","verify"];
        this.defaultSetting.replys=[":x: Fake",":grey_question: Not Sure",":white_check_mark: Truth"];
        this.defaultSetting.thresholds=[-1/3,1/3];
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
        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["判斷事實",arg]}, (err, data) => {
            if(err)
                console.log(err);
            //data="[0.73]";
            var result=JSON.parse(data)[0];
            var responseI=result<this.settings.thresholds[0]?0:result<this.settings.thresholds[1]?1:2;
            var response=this.settings.replys[responseI];
            var embed =
            {
                color:0x0099ff,
                author:{
                    name:`${arg}`
                },
                description:`${response}\nTruth P : ${progressGen((result+1)*100/2,100,{display:"🟧",empty:"⬛"})}`
                

            }
            
            channel.send({embed:embed});
            
          })
        
        
        
        
    }
}

module.exports=TruthVerify;
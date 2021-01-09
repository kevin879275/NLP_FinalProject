const Path=require("../js/PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
const {random,progressGen}=require(`${Path.jsFolder}util`);
const { PythonShell } = require('python-shell');
const { addSlashes, stripSlashes } = require('slashes');
const { Util } = require("discord.js");
class SentenceCheck extends Cmd
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="sentenceCheck";
        this.defaultSetting.alias=["check","sc","sv","sentenceVerify"];
        this.defaultSetting.toneReplys=[":x: Fake",":grey_question: Not Very Sure",":white_check_mark: Sure"];
        this.defaultSetting.emotionReplys=[":frowning2: Bad bad",":no_mouth: So-so",":grinning: Good"];
        this.defaultSetting.subjectivityReplys=[":busts_in_silhouette: objective",":bust_in_silhouette: subjective"];
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
    classifyIndex(value,config={min:0,max:1,num:3})
    {
        config={...{min:0,max:1,num:3},...config}
        let {min,max,num}=config;
        let len=max-min;
        let step=len/num;
        for (let i=min,index=0;i<max;i+=step,index++)
        {
            let lim=i+step;
            if(index==num-1)
                lim=max;
            if(value<=lim)
                return index;
        }
    }
    onmessage({cmd,args,msg,content,channel,author,member})
    {
        if(!this.verifys(msg))return;
        var limit=this.settings.limit;
        var startSlice=1;

            
        var arg=content.split(" ").slice(startSlice).join(" ")
        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["句子判斷",arg]}, (err, data) => {
            if(err)
                console.log(err);
            //data="[0.73]";
            var results=JSON.parse(data[0]);
            var result=results[0];
            var responseTI=this.classifyIndex(result,{min:-1,num:this.settings.toneReplys.length});
            var responseE=this.settings.emotionReplys[this.classifyIndex(results[1],{min:-1,num:this.settings.emotionReplys.length})];
            var responseS=this.settings.subjectivityReplys[this.classifyIndex(results[2],{num:this.settings.subjectivityReplys.length})];
            var responseT=this.settings.toneReplys[responseTI];
            var embed =
            {
                color:0x0099ff,
                author:{
                    name:`${arg}`
                },
                fields:[
                    {name:"confidence",value:`${responseT}\n ${progressGen((result+1)*100/2,100,{display:"🟧",empty:"⬛"})}`},
                    {name:"emotion",value:`${responseE}\n ${progressGen((results[1]+1)*100/2,100,{display:"🟧",empty:"⬛"})}`},
                    {name:"subjectivity",value:`${responseS}\n ${progressGen((results[2])*100,100,{display:"🟧",empty:"⬛"})}`}
                ]          

            }
            
            channel.send({embed:embed});
            
          })
        
        
        
        
    }
}

module.exports=SentenceCheck;
const Path=require("../js/PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
const { PythonShell } = require('python-shell')
class PrefixQuery extends Cmd
{
    constructor(settingsManager,bot)
    {
        super(settingsManager,bot);
        this.name="prefixQuery";
        this.defaultSetting.alias=["pq"];
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
        
    }
    onmessage({cmd,args,msg,content,channel,author,member})
    {
        if(!this.verifys(msg))return;

        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["字根查詢",args[0]]}, (err, data) => {
            if(err)
                console.log(err);
            console.log(typeof(data[0]))
            console.log(data[0])
            var d=JSON.parse(data[0]);
            if (d.status!="OK")
            {
                channel.send(":x: no result");
                return;
            }
            var embed =
            {

                color:0x0099ff,
                title:d.root_word,
                description:d.meanings,
                fields:[]
            }
            for(let i in d.examples_definitions)
            {
                var exp=d.examples_definitions[i];
                embed.fields.push({name:`example ${parseInt(i)+1}`,value:exp});
            }
        
            
            channel.send({embed:embed});
          })
        
    }
}
class SuffixQuery extends Cmd
{
    constructor(settingsManager,bot)
    {
        super(settingsManager,bot);
        this.name="suffixQuery";
        this.defaultSetting.alias=["sq"];
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
        
    }
    onmessage({cmd,args,msg,content,channel,author,member})
    {
        if(!this.verifys(msg))return;

        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["字尾查詢",args[0]]}, (err, data) => {
            if(err)
                console.log(err);
            console.log(typeof(data[0]))
            console.log(data[0])
            var d=JSON.parse(data[0]);
            if (d.status!="OK")
            {
                channel.send(":x: no result");
                return;
            }
            var embed =
            {

                color:0x0099ff,
                title:d.suffix,
                description:d.meanings,
                fields:[{name:"ex. ",value:d.example}]
            }
            
        
            
            channel.send({embed:embed});
          })
        
    }
}
module.exports={PrefixQuery,SuffixQuery};
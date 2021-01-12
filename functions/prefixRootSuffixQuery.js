const Path=require("../js/PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
const { PythonShell } = require('python-shell')
class PrefixRootSuffixQuery extends Cmd
{
    constructor(settingsManager,bot)
    {
        super(settingsManager,bot);
        this.name="prefixRootSuffixQuery";
        this.defaultSetting.alias=["prs","prsq","prefixRootSuffix"];
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
        
    }
    sendPrefixEmbedOfData(d,channel,title)
    {
        if (d.status!="OK")
        {
            
            return;
        }
        var embed =
        {

            color:0x0099ff,
            author:{
                name:`${title}`
            },
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
    }
    sendSuffixEmbedData(d,channel,title)
    {

        if (d.status!="OK")
        {
            return;
        }
        var embed =
        {
            author:{
                name:`${title}`
            },
            color:0x0099ff,
            title:d.suffix,
            description:d.meanings,
            fields:[{name:"ex. ",value:d.example}]
        }
        channel.send({embed:embed});
    }
    onmessage({cmd,args,msg,content,channel,author,member})
    {
        if(!this.verifys(msg))return;

        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["字首根尾",args[0]]}, (err, data) => {
            if(err)
                console.log(err);
            var dict=JSON.parse(data[0]);
            var sent=false
            for(let k in dict)
            {
                let v=dict[k];
                if(k=="suffix")
                    this.sendSuffixEmbedData(v,channel,k);
                else
                    this.sendPrefixEmbedOfData(v,channel,k);
                sent=true;
            }
            if(!sent)
            {
                channel.send(":x: no result");
            }

            
        })
    }
}

module.exports=PrefixRootSuffixQuery;
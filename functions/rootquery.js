const Path=require("../js/PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
const { PythonShell } = require('python-shell')
class RootQuery extends Cmd
{
    constructor(settingsManager,bot)
    {
        super(settingsManager,bot);
        this.name="rootQuery";
        this.defaultSetting.alias=["rq"];
        this.defaultSetting.op=true;
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
        
    }
    onmessage({cmd,args,msg,content,channel,author,member})
    {
        if(!this.verifys(msg))return;

        PythonShell.run(`${Path.pythonScriptsFolder}main.py`, {args:["字根查詢",args[0]]}, (err, data) => {
            if(err)
                console.log(err);

            channel.send(data);
          })
        
    }
}

module.exports={RootQuery};
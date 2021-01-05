const Path=require("../PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
const {random}=require(`${Path.jsFolder}util`);
class Say extends Cmd
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="say";
        this.defaultSetting.alias=["send"];
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
    }
    onmessage({cmd,args,msg})
    {
        if(!this.verifys(msg))return;
        let content=msg.content;
        let toCh;
        let ans=args.join(" ");
        if(msg.mentions.channels.size>0)
        {
            toCh=msg.mentions.channels.find(val=>val.type=="text");
        }
        else
        {
            if(args.length>1)
            {
                let toChid=args[args.length-1];
                toCh=this.bot.channels.get(toChid);
                if(!toCh)
                {
                    toChid=args[0];
                    toCh==this.bot.channels.get(toChid);
                    if(!toCh)
                    {
                        toCh=msg.channel;
                    }
                        
                }
                
            }
            else
                toCh=msg.channel;

        }
        ans=ans.replace(`<#${toCh.id}>`,"").replace(toCh.id,"");
        toCh.send(ans);
        
        
    }
}
module.exports=Say;
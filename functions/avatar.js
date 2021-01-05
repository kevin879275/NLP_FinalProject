const Path=require("../PathSetting");
const {Cmd} =require(`${Path.jsFolder}botHandler.js`);
class Avatar extends Cmd
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="avatar";
        this.defaultSetting.alias=["a"];
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
    }
    onmessage({cmd,args,msg,channel})
    {
        if(!this.verifys(msg))return;
        let bot=this.bot;
        let user;
        if(msg.mentions.users.size>0)
        {
            user=bot.users.get(msg.mentions.users.first().id);
           
        }
        else if(args.length>0&&bot.users.get(args[0]))
        {
            user=bot.users.get(args[0]);
        }else
            user=bot.users.get(msg.author.id);
        if(this.sendOrEdit(channel,user.displayAvatarURL))
            this.tryDelete(msg);
    }
}
module.exports=Avatar;
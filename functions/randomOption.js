const Path=require("../js/PathSetting");
const {Functions} =require(`${Path.jsFolder}botHandler.js`);
const {random}=require(`${Path.jsFolder}util`);
class RandomOption extends Functions
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="randomOption";
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
        this.formatHelpString=`任意句子中含大括號{}包著選項，透過|符號分隔，新增無限多個選項從中選出
        `;
    }
    processString(content)
    {
        if(content.search(/\{.+?(\|.+?)+?\}/g)!=-1)
        {
            content=content.replace(/\{.+?(\|.+?)+?\}/g,(match,p1)=>
            {
                match=match.replace(/[\{\}]/g,"");
                let options=match.split("|");
                return options[random(options.length)];
            });

        }
        return content
    }
    onmessage({cmd,args,msg,content,channel,author,member})
    {
        if(!this.verifys(msg))return;
        if(content.search(/\{.+?(\|.+?)+?\}/g)!=-1)
        {
            msg.channel.send(this.processString(content)+` by ${member.displayName}\n`);
            this.tryDelete(msg);
        }
        
        
        
    }
}
module.exports=RandomOption;
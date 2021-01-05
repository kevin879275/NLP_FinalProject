const Path=require("../js/PathSetting");
const {Functions} =require(`${Path.jsFolder}botHandler.js`);
const {random}= require(`${Path.jsFolder}util`);
class EmojiFollwer extends Functions
{
    constructor(settingsManager,botHandler)
    {
        super(settingsManager,botHandler);
        this.name="emojiFollower";
        this.defaultSetting.alias=[];
        this.defaultSetting.customEmoji=
        {
            "602165248266469377":
            [
                "li_",
                "emoji_4"
            ]
        }
        this.defaultSetting.emoji=['😀'];
        this.defaultSetting.random=true;
        this.defaultSetting.randomMax=5;
        this.defaultSetting.filePath= __filename.slice(__dirname.length + 1);
        this.settingsProcess();
    }
    customEmojiProcess(msg)
    {
        let check=msg.content.replace(/<:.+:[0-9]{18}>/g,"").replace(/ /g,"");
        if(check!="")return false;
        let id=msg.content.substring(msg.content.search(/:[0-9]{18}>/)+1,msg.content.search(/:[0-9]{18}>/)+19);
        let emo=this.bot.emojis.get(id);
        let customWhiteEmoji=this.settings.customEmoji[msg.guild.id];
        if(!emo)return false;
        if(!customWhiteEmoji)
        {
            msg.channel.send(`<:${emo.identifier}>`.repeat(random(1,this.settings.randomMax)));
            return true;
        }   
        for(let name of customWhiteEmoji)
            if(name==emo.name)
            { 
                   msg.channel.send(`<:${emo.identifier}>`.repeat(random(1,this.settings.randomMax)));
                return true;
            }
        return false;

    }
    isEmoji(string)
    {
            var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/;
            return string.search(regex)!=-1;
    }
    emojiProcess(msg)
    {
        let check=msg.content.replace(/ /g,"");
        let emoji=msg.content.slice(0,2);
        if(!this.isEmoji(emoji))
            return false;
        check=msg.content.replace(new RegExp(emoji, 'g'),"");
        if(check!="")return false;
        if(!this.settings.emoji)
            msg.channel.send(emoji);
        else
        {
            for(let emo of this.settings.emoji)
                if(emo==emoji)
                    msg.channel.send(emoji);
        }
            
    }
    onmessage({msg})
    {
        if(!this.verifys(msg))return;
        if(msg.length<2)return;
        let bot=this.bot;
        let user=msg.author;
        if(!this.customEmojiProcess(msg))
            this.emojiProcess(msg);
            
    }
}
module.exports=EmojiFollwer;
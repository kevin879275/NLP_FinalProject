/**
 * @extends discord-selfbot by Jinx#4321 @https://github.com/JinxHvH/discord-selfbot
 * @description 接龍、打招呼自體機器人
 * @author 繩繩#2404
 *  * 接龍功能開發完成
 *  * 回應功能開發完成(安安怪)
 */


const Path=require('./PathSetting');
const https=require("https")
/*var serviceAccount = require(`${Path.rootSpace}serviceAccountKey.json`);
var admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://discordbot-7cec0.firebaseio.com"
  });*/
const { Client } = require('discord.js');
const bot = new Client();
const fs=require("fs");
const SettingClass=require(`${Path.jsFolder}setting.js`);
const settingsManger=new SettingClass();
const settings = settingsManger.settings;

const {BotCmdHandler}=require(`${Path.jsFolder}botHandler.js`);
const botHandler=new BotCmdHandler(bot,settingsManger);

function installFunction(cla,settingsM=settingsManger,b=botHandler)
{
    let installed=cla.constructor.name==="Function"
    if(installed)
    {
        func=new cla(settingsM,b);
        b.installFunction(func);
    }
    return installed;
}
for(let key in settings.functions)
{
    let setting=settings.functions[key];
    let path=`${Path.functionsFolder}${setting["filePath"]}`;
    if(fs.existsSync(path))
    {
        let cla=require(path);
        if(!installFunction(cla))
            for(let key in cla)
            {
                let subcla=cla[key];
                installFunction(subcla);
            }
        
    }
    
}
/**
 * readToken() -> (string) discord token
 * @description  read token from token.txt (gitignore) or settings['token']
 * @returns (string) token
 */
function readToken()
{

    var token="";
    if(fs.existsSync(`${Path.dataFolder}token.txt`))
    {
        var data=fs.readFileSync(`${Path.dataFolder}token.txt`,'utf-8');
        if(data.length>=59)
            token=data.slice(0,59)
    }
    return  token || settings.token
}

bot.login(readToken());
bot.on('ready', ()=>{

});


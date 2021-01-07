function random(d=100,t)
{
    let rd=(from,to)=>{
        let len=to-from;
        return Math.floor(Math.random() *(len+1))+from;
    }
    if(t)
    {
        let a=Math.min(t,d),b=Math.max(t,d);
        return  rd(a,b);
    }
    else
        return rd(0,d-1);
}
function shuffle(arr) {
    var currentIndex = arr.length, temporaryValue, randomIndex;
    var array=[...arr];
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
function progressGen(val,full=100,config)
{
  config={...{showPercent:true,showValue:false,display:'|',empty:' ',len:10,todec:1},...config};
  let p=val/full,dis=Math.round(p*config.len),emp=config.len-dis,pa=(p*100).toFixed(config.todec);
  return `${config.display.repeat(dis)}${config.empty.repeat(emp)} ${config.showPercent?pa+'%':''} ${config.showValue?val:""}`
}
function isset(variable)
{
  return variable!==undefined
}
function issetRecursive(obj,path)
{
  path=path.split(".");
  for(let name of path)
  {
    if(!isset(obj[name]))
      return false;
    obj=obj[name];
  }
  return true
}
function genObjPath(obj,path)
{
  path=path.split(".");
  for(let name of path)
  {
    if(!isset(obj[name]))
      obj[name]={};
    obj=obj[name];
  }
  return obj;
}
function isEmptyObj(obj)
{
  for(var i in obj)
    return false;
  return true;
}
function getPathVal(obj,path,defaultVal=undefined)
{
  path=path.split(".");
  for(let name of path)
    if(isset(obj))
      obj=obj[name];
    else return defaultVal;
  return obj;
}
module.exports={random,shuffle,progressGen,isset,issetRecursive,genObjPath,isEmptyObj,getPathVal};
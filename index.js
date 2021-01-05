
process.on('unhandledRejection', (reason, promise) => {
    process.exit(1);
});

try
{
    require("./js/main.js");
    error=false;
}
catch(e)
{   
    console.warn(e.message)
    process.exit(1);
}
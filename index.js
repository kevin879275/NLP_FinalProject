
process.on('unhandledRejection', (reason, promise) => {
    process.exit(1);
});

try
{
    require("./main.js");
    error=false;
}
catch(e)
{   
    process.exit(1);
}
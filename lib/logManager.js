module.exports =  function(target) {
    const logs = [] ;
    const errs = [] ;
    return [function log(...args){
        logs.push(JSON.stringify(args));
        console.log(`[${target}]`,...args);
        if(logs.length > 1000)logs.splice(0, 300);
    },function error(...args){
        errs.push(JSON.stringify(args));
        console.error(`[${target}]`,...args);
        if(errs.length > 1000)errs.splice(0, 300);
    },function all(){
        return [target,logs,errs];
    }]
};

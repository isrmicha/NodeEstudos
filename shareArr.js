const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
var fs = require('fs');
if (cluster.isMaster) { //MASTER
    var arrBuffer = [];
    for (let i = 0; i <100; i++) {
            arrBuffer.push(i);
         }
         let tempLength = arrBuffer.length;
    for (let i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        worker.send({arr : arrBuffer.splice(0,Math.ceil(tempLength/numCPUs)),index : i});
        console.log(arrBuffer.length);
    }

} else { //SLAVE
    process.on('message',(msg)=>{
        console.log(msg.arr);
        fs.writeFileSync('texto'+msg.index,msg.arr.join());
    })

}
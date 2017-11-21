const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
var tempNum = numCPUs;
var fs = require('fs');
if (cluster.isMaster) { //MASTER
    var arrBuffer = [];
    var arrTemp = [];
    for (let i = 0; i <100; i++) {
            arrBuffer.push(i);
         }
         let tempLength = arrBuffer.length;
    for (let i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        worker.send({arr : arrBuffer.splice(0,Math.ceil(tempLength/numCPUs)),index : i});
        worker.on('message',(msg)=>{
            arrTemp = arrTemp.concat(msg);
         })
        worker.on('exit',()=>{
            console.log("Worker Morto");
            tempNum--;
            console.log(tempNum);
            if(!tempNum){
                console.log('FIM');
                console.log(arrTemp.sort((a,b)=>parseInt(a)-parseInt(b)));
            }
        })
    }
    // console.log(Object.keys(cluster.workers));
} else { //SLAVE
    process.on('message',(msg)=>{
        process.send(msg.arr);
        process.exit();
    })
}
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) { //MASTER
    var arrBuffer = [];
    for (let i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        worker.on('message',(msg)=>{
            console.log(msg.mensagem);
            if(msg.buffer){
                console.log(msg.buffer);
                arrBuffer.push(msg.buffer);
                if(arrBuffer.length==numCPUs){
                    console.log("Fim buffers");
                }
            }
        })
        worker.on('exit',()=>{
            console.log("Worker Morreu");
        })
        worker.send({mensagem : "[Master] FOLOW MY ORDERS", index : i});
    }

} else { //SLAVE
    var fs = require('fs');
    process.on('message',(msg)=>{
        console.log(msg.mensagem);
        process.send({mensagem :"[Slave] Ready to work sir."});
         process.send({mensagem : "[Slave] Aqui está o buffer do "+msg.index, buffer : new Buffer(fs.readFileSync('escrita1.txt'))});
      
    });

}
// var fs = require('fs');
// var zlib = require('zlib');
// var gzip = zlib.createGzip({level : 9});
// var leitura = fs.createReadStream('escrita1.txt');
// var escrita = fs.createWriteStream('escrita1.txt.gz');
// leitura.pipe(gzip).pipe(escrita);

// escrita.on('close',(()=>{
//     var size1 = (fs.statSync('escrita1.txt').size) / 1024,
//     size2 = (fs.statSync('escrita1.txt.gz').size) / 1024;
// console.log(`\u{1b}[35m [Compressão]\u{1b}[0m redução de\u{1b}[32m ${((1-((size2/size1)))*100).toFixed(2)}%\u{1b}[0m do tamanho original\u{1b}[31m ${size1}\u{1b}[0m Kb para\u{1b}[31m ${size2.toFixed(2)}\u{1b}[0m Kb`);

// }))
var cont = 0;
process.stdout.write(`[Progressão]: \u{1b}[35m ${cont}%\u{1b}[0m`);
var intervalo = setInterval(()=>{
    if(cont==100){
        clearInterval(intervalo);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`\u{1b}[32m [Completo]\u{1b}[0m`);
    }
    else{
    cont++;
    // process.stdout.clearLine();
    process.stdout.cursorTo(14);
    process.stdout.write(`\u{1b}[35m ${cont}%\u{1b}[0m`);
    }
},100);

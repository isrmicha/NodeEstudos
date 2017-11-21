
var fs = require('fs');
var archiver = require('archiver');
var unzip = require('unzip');
if(!fs.existsSync('pasta1/')){
    fs.mkdirSync('pasta1');
}
// create a file to stream archive data to.
var output = fs.createWriteStream(__dirname + '/example.zip');
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    fs.createReadStream('example.zip').pipe(unzip.Extract({ path: 'pasta1/' }));

});
  archive.append('escrita1.txt', { name: 'file1.txt' });
  archive.append('escrita2.txt', { name: 'file2.txt' });
  archive.pipe(output);
  archive.finalize();


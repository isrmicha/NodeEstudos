

const { performance } = require('perf_hooks');
let tempArr = [];
for(let i = 0;i<1e4;i++){
    tempArr.push(i);
}
performance.mark('A');
let temp = -1;
for(let i = 0;i<tempArr.length;i++){
    temp = tempArr[i];
}
// tempArr.forEach((a)=>{
//     temp = a;
// })
performance.mark('B');
performance.measure('A to B', 'A', 'B');
const measure = performance.getEntriesByName('A to B')[0];
console.log(measure.duration);

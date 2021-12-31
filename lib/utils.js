const { exec } = require('child_process');
const si = require('systeminformation');
const os = require('os-utils');

let cpuLoad, totalMem, usedMem;

async function getMem() {
 return (await si.mem());
};

os.cpuUsage( (v) => {
 cpuLoad = (v * 100).toFixed(1);
});

getMem().then(x=> {
 totalMem = (x.total / 1024 / 1024 / 1024).toFixed(1);
 usedMem = (x.active / 1024 / 1024 / 1024).toFixed(1);
});

exports.cpuLoad = cpuLoad;
exports.totalMem = totalMem;
exports.usedMem = usedMem;

const si = require('systeminformation');

const getStatus = () => {
	return Promise.all([si.currentLoad(), si.mem()])
	.then(([load, mem]) => {
		const cpuS = (load.currentLoad).toFixed(0);
		const totalMemS = (mem.total / 1024 / 1024 / 1024).toFixed(2);
		const usedMemS = ((mem.active / 1024 / 1024 / 1024)- 0.3).toFixed(2);
		return {cpuStotalMemS, usedMemS, totalMemS};
	});
};

module.exports = {getStatus};

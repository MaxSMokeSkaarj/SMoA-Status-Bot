const si = require('systeminformation');
const config = require('../json/config.json')
const getStatus = () => {
	return Promise.all([si.currentLoad(), si.mem(), si.cpuTemperature()])
	.then(([load, mem, temp]) => {
		const cpu = (load.currentLoad).toFixed(1);
		const totalMem = (mem.total / 1024 / 1024 / 1024).toFixed(2);
		const usedMem = ((mem.active / 1024 / 1024 / 1024)- 0.3).toFixed(2);
		return {cpu, usedMem, totalMem, temp};
	});
};
const getMemory = (robot) => {
	setTimeout(() => {
		getStatus()
			.then(({ cpu, usedMem, totalMem, temp }) => {
				robot.user.setActivity(`Mem:${usedMem}/${totalMem}GB`, { type: 3 });
			}).catch(e => {
				console.log(e);
			});
	}, config.statusInterval);
}
const getCPU = (robot) => {
	setTimeout(() => {
		getStatus()
			.then(({ cpu, usedMem, totalMem, temp }) => {
				robot.user.setActivity(`CPU: ${cpu}%`, { type: 3 });
			}).catch(e => {
				console.log(e);
			});
	}, config.statusInterval);
}
const getTemp = (robot) => {
	setTimeout(() => {
		getStatus()
			.then(({ cpu, usedMem, totalMem, temp }) => {
				robot.user.setActivity(`CPU temperature: ${temp.main}°C`, { type: 3 });
			}).catch(e => {
				console.log(e);
			});
	}, config.statusInterval);
}
module.exports = {getStatus, getMemory, getCPU, getTemp};

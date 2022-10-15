const si = require('systeminformation');
const {exec} = require('child_process')

const getStatus = () => {
	return Promise.all([si.currentLoad(), si.mem(), si.cpuTemperature()])
	.then(([load, mem, temp]) => {
		const cpu = (load.currentLoad).toFixed(1);
		const totalMem = (mem.total / 1024 / 1024 / 1024).toFixed(2);
		const usedMem = ((mem.active / 1024 / 1024 / 1024)- 0.3).toFixed(2);
		return {cpu, usedMem, totalMem, temp};
	});
};

let execute = (msg, arg) => {
	arg.shift()
	let cmd = arg.join(" ")
	exec(cmd, (err,stdout, stderr) => {
		if (stdout.length >= 4000 ) stdout = "Слишком длиное сообщение"
		if (stdout.length < 1) stdout = "Пусто"
		if(err) return msg.channel.send(err)
		if(stdout) msg.channel.send(`\`\`\`${stdout}\`\`\``)
		if(stderr) msg.channel.send(stderr)
	})
};

module.exports = {getStatus, execute};

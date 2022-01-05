const { Client, Intents } = require('discord.js');
const robot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const config = require('./json/config.json');
const {getStatus} = require('./lib/utils.js');
const token = config.token;

robot.on("ready", function() {
	console.log(robot.user.username + " is running");
	setInterval(() => {
		getStatus()
		.then(({cpu, usedMem, totalMem}) => {
			 robot.user.setActivity(`CPU: ${cpu}%, Mem:${usedMem}/${totalMem}GB`, {type: 3});
		}).catch(e => {
			console.log(e);
		});
	}, 1000);
 
});

robot.login(token);

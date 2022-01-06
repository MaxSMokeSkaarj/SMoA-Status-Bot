require('dotenv').config();

const { Client, Intents } = require('discord.js');
const robot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const config = require('./json/config.json');
const {getStatus} = require('./lib/utils.js');

robot.on("ready", function() {
	console.log(robot.user.username + " is running");
	setInterval(() => {
		getStatus()
		.then(({cpu, usedMem, totalMem}) => {
			 robot.user.setActivity(`CPU: ${cpu}%, Mem:${usedMem}/${totalMem}GB`, {type: 3});
		}).catch(e => {
			console.log(e);
		});
	}, config.statusInterval);
 
});

robot.login(process.env.DISCORD_TOKEN);

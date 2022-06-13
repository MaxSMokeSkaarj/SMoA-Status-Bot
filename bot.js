require('dotenv').config();

const { Client, Intents } = require('discord.js');
const robot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const config = require('./json/config.json');
const { getCPU, getMemory, getTemp } = require('./lib/utils.js');

robot.on("ready", function () {
	console.log(robot.user.username + " is running");
	while (true) {
		getCPU(robot)
		getMemory(robot)
		getTemp(robot)
	}
});

robot.login(process.env.DISCORD_TOKEN);

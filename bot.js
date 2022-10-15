require('dotenv').config();

const { Client, Intents } = require('discord.js');
const robot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./json/config.json');
const {getStatus, execute} = require('./lib/utils.js');
let prefix = "!"
robot.on("ready", function() {
	console.log(robot.user.username + " is running");
	setInterval(() => {
		getStatus()
		.then(({cpu, usedMem, totalMem, temp}) => {
			 robot.user.setActivity(`CPU: ${cpu}%, CPU temp: ${temp.main}°C, Mem:${usedMem}/${totalMem}GB`, {type: 3});
		}).catch(e => {
			console.log(e);
		});
	}, config.statusInterval);
 
});

robot.on('messageCreate', (msg) => {
	if (msg.author.username != robot.user.username && msg.author.discriminator != robot.user.discriminator && msg.author.id == 483833827563798552) {
		let comm = msg.content.trim() + " ";
		let comm_name = comm.slice(0, comm.indexOf(" "));
		let messArr = comm.split(" ");
		if(comm_name == "!exec") {execute(msg, messArr)}
	} else if (msg.author.id == 483833827563798552) msg.channel.send("Access Denied!")
})
robot.login(process.env.DISCORD_TOKEN);

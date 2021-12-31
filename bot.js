const { Client, Intents } = require('discord.js');
const robot = new Client({ intents: [Intents.FLAGS.GUILDS] });
let config = require('./../json/dsconf.json');
let utils = require('./lib/utils.js');

let cpuLoad = utils.cpuLoad
let usedMem = utils.usedMem
let totalMem = utils.totalMem
let token = config.token;

robot.on("ready", function() {
 console.log(robot.user.username + " is running");
});

setInterval( () => {
 robot.user.setActivity(`CPU: ${cpuLoad}%, Mem:${usedMem}/${totalMem}GB`, {type: 3});
}, 5000);
robot.login(token);

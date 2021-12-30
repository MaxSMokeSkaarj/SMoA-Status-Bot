const { Client, Intents } = require('discord.js');
const robot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const si = require('systeminformation');
const os = require('os-utils');
let config = require('./json/config.json');
let token = config.token;

robot.on("ready", function() {
 console.log(robot.user.username + " is running");
});

let cpu, totalmem, usedmem;

setInterval( () => {
 os.cpuUsage( (v) => {
  cpu = (v * 100).toFixed(1);
 });

 si.mem().then(x=> {
  totalmem = (x.total / 1024 / 1024 / 1024).toFixed(1);
  usedmem = ((x.active / 1024 / 1024 / 1024).toFixed(1));
 });

 robot.user.setActivity(`CPU: ${cpu}%, Mem:${usedmem}/${totalmem}GB`, {type: 3});
}, 5000);
robot.login(token);

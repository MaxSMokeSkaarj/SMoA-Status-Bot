const { Client, Intents } = require('discord.js');
const robot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const si = require('systeminformation');
let config = require('./json/config.json');
let token = config.token;

// при старте бота по готовности
robot.on("ready", function() {
  console.log(robot.user.username + " is running");
  setInterval( () => {
  Promise.all([si.currentLoad(), si.mem()])
    .then(([load, mem]) => {
      const cpuS = (load.currentLoad).toFixed(1);
      const totalMemS = (mem.total / 1024 / 1024 / 1024).toFixed(2);
      const usedMemS = ((mem.active / 1024 / 1024 / 1024) - 0.3).toFixed(2);
      robot.user.setActivity(`CPU: ${cpuS}%, Mem:${usedMemS}/${totalMemS}GB`, {type: 3});
    }).catch(err => {
      console.error("Ошибка при получении системной информации", err);
    });
  }, 1000);
});


robot.login(token);

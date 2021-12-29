//инит зависимостей
const { exec } = require('child_process')
const { Client, Intents } = require('discord.js');
const robot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');
const os = require('os-utils')
let config = require('./json/config.json');
let token = config.token;

//активация бота
robot.on("ready", function() {
 console.log(robot.user.username + " is running");
});

//предобьявление переменных
let cpu, fullmem,totmem,mem

//работаем со сбором данных и изменением статуса бота
setInterval( () =>{
 //запрашиваем  загруженность процесссора
 os.cpuUsage( (v) => {
  cpu = v * 100
  cpu = cpu.toFixed(1)
 })
 //сбор загруженности озу
 exec('free -h', (e, stdout, stderr) => {
  let mem = stdout.split('\n')[1].split(' ').join().split(',,,,,,,,,,,')[1].split(',,,,,,,') //костыль, работает только для linux
  fullmem= mem[1].slice(0,-2) //количество занятого озу
  totmem= mem[0].slice(0,-2) //всего озу
 })
 //ставим боту статус
 robot.user.setActivity(`CPU: ${cpu}%, Mem:${fullmem}/${totmem}GB`, {type: 3})
}, 5000)
robot.login(token); // аутенфикация по токену

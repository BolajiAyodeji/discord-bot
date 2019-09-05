"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
const botClient = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
botClient.on('ready', () => {
    console.log('Moti wa online');
});
botClient.on('message', msg => {
    if (msg.author.bot) {
        return;
    }
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    msg.channel.send(`
    ${msg.author.username} just used a command
    
    `);
});
function loadCommands(commandsPath) {
    if (!ConfigFile.config || ConfigFile.config.commands.length === 0) {
        return;
    }
    for (const commandName of ConfigFile.config.commands) {
        const commandCLass = require(`${commandsPath}/${commandName}`).default;
    }
}
botClient.login(ConfigFile.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBa0J2QyxNQUFNLFNBQVMsR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFdkQsSUFBSSxRQUFRLEdBQWlCLEVBQUUsQ0FBQztBQUVoQyxZQUFZLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxDQUFBO0FBRXJDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUd2QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUcxQixJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ2YsT0FBTztLQUNWO0lBR0QsSUFBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbEQsT0FBTztLQUNWO0lBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7TUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVE7O0tBRXBCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBUyxZQUFZLENBQUMsWUFBb0I7SUFHdEMsSUFBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFxQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUM7UUFDM0UsT0FBTztLQUNWO0lBR0QsS0FBSSxNQUFNLFdBQVcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQW9CLEVBQUU7UUFDN0QsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsWUFBWSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO0tBQzFFO0FBQ0wsQ0FBQztBQUVELFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9
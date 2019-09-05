"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
const fetch = require("node-fetch");
fetch('https://api.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': "86bc79b4-ff86-4d7e-967c-67e7e680520d" },
    body: JSON.stringify({
        query: `query{
                  storiesFeed(type: FOR_ME, page: 1){
                  title
                  type
            }`
    }),
})
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res)));
const botClient = new Discord.Client();
botClient.on("ready", () => {
    console.log('Moti wa online');
});
botClient.on("message", msg => {
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
botClient.login(ConfigFile.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBQ3ZDLG9DQUFvQztBQUVwQyxLQUFLLENBQUMsMEJBQTBCLEVBQUU7SUFDOUIsTUFBTSxFQUFFLE1BQU07SUFDZCxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLHNDQUFzQyxFQUFDO0lBQ3ZHLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pCLEtBQUssRUFBRTs7OztjQUlEO0tBQ1QsQ0FBQztDQUNMLENBQUM7S0FDRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUVsRCxNQUFNLFNBQVMsR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFdkQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBR3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBRzFCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDZixPQUFPO0tBQ1Y7SUFHRCxJQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNsRCxPQUFPO0tBQ1Y7SUFFRCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztNQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUTs7S0FFcEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUE7QUFFRixTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMifQ==
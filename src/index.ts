import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import * as fetch from "node-fetch";

fetch('https://api.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': "86bc79b4-ff86-4d7e-967c-67e7e680520d"},
    body: JSON.stringify({
        query: `query{
                  storiesFeed(type: FOR_ME, page: 1){
                  title
                  type
            }`
    }),
})
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res)))

const botClient: Discord.Client = new Discord.Client();

botClient.on("ready", () => {

    // alert, when bot is online
    console.log('Moti wa online')
})

botClient.on("message", msg => {

    // ignore message sent by bot
    if(msg.author.bot) {
        return;
    }

    // ignore messages that dosen't start with the prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }

    msg.channel.send(`
    ${msg.author.username} just used a command
    
    `);
})

botClient.login(ConfigFile.config.token);
import * as Discord from "discord.js";
import * as ConfigFile from "./config";

const client: Discord.Client = new Discord.Client();

client.on("ready", () => {

    // alert, when bot is online
    console.log('Moti wa online')
})

client.on("message", msg => {

    // ignore message sent by bot
    if(msg.author.bot) {
        return;
    }

    // ignore messages that dosen't start with the prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }

    msg.channel.send(`${msg.author.username} just used a command`);
})

client.login(ConfigFile.config.token);
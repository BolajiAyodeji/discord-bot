import * as Discord from 'discord.js';
import * as ConfigFile from './config';
import * as dotenv from 'dotenv';
import { IBotCommand } from './api';
import { GraphQLClient } from 'graphql-request'
dotenv.config();

async function main() {
    const endpoint = 'https://api.hashnode.com'

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: `${process.env.HASHNODE_TOKEN}`,
        },
    })

    const stories = `
  query{
    storiesFeed(type: FOR_ME, page: 1){
      _id
      title
      type
      slug
      cuid
    }
  }
  `
    const discussions = `
  query{
    discussionsFeed(type: RECENT, page: 1) {
      _id
      title
      type
      slug
      cuid
    }
  }
  `

    interface TData {
        storiesFeed: { _id: string, title: string, type: string, slug: string, cuid: string },
        discussionsFeed: { _id: string, title: string, type: string, slug: string, cuid: string }
    }

    

    const data = await graphQLClient.request<TData>(stories)
    const data2 = await graphQLClient.request<TData>(discussions)
    console.log(JSON.stringify(data, undefined, 2))
    console.log(JSON.stringify(data2, undefined, 2))
}

main().catch(error => console.error(error))

const botClient: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

botClient.on('ready', () => {

    // alert, when bot is online
    console.log('Moti wa online')
})

botClient.on('message', msg => {

    // ignore message sent by bot
    if (msg.author.bot) {
        return;
    }

    // ignore messages that doesn't start with the prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }

    handleCommand(msg);
})

async function handleCommand(msg: Discord.Message) {
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
    let args = msg.content.split(" ").slice(1);

    for (const commandsClass of commands) {
        try {
            if (!commandsClass.isThisCommand(command)) {
                continue;
            }
            await commandsClass.runCommand(args, msg, botClient);
        } catch (err) {
            console.log(err)
        }

    }
}

function loadCommands(commandsPath: string) {

    //exit if no command exist
    if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) {
        return;
    }

    //loop through all commands
    for (const commandName of ConfigFile.config.commands as string[]) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass as IBotCommand;
        commands.push(command)
    }
}

botClient.login(ConfigFile.config.token);
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
const dotenv = require("dotenv");
const graphql_request_1 = require("graphql-request");
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = 'https://api.hashnode.com';
        const graphQLClient = new graphql_request_1.GraphQLClient(endpoint, {
            headers: {
                authorization: `${process.env.HASHNODE_TOKEN}`,
            },
        });
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
  `;
        const discussions = `
  query{
        discussionsFeed(type: RECENT, page: 1) {
          title
        }
  }
  `;
        const data = yield graphQLClient.request(stories);
        const data2 = yield graphQLClient.request(discussions);
        console.log(JSON.stringify(data, undefined, 2));
        console.log(JSON.stringify(data2, undefined, 2));
    });
}
main().catch(error => console.error(error));
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
    handleCommand(msg);
});
function handleCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
        let args = msg.content.split(" ").slice(1);
        for (const commandsClass of commands) {
            try {
                if (!commandsClass.isThisCommand(command)) {
                    continue;
                }
                yield commandsClass.runCommand(args, msg, botClient);
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
function loadCommands(commandsPath) {
    if (!ConfigFile.config || ConfigFile.config.commands.length === 0) {
        return;
    }
    for (const commandName of ConfigFile.config.commands) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass;
        commands.push(command);
    }
}
botClient.login(ConfigFile.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBQ3ZDLGlDQUFpQztBQUVqQyxxREFBK0M7QUFDL0MsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLFNBQWUsSUFBSTs7UUFDZixNQUFNLFFBQVEsR0FBRywwQkFBMEIsQ0FBQTtRQUUzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLCtCQUFhLENBQUMsUUFBUSxFQUFFO1lBQzlDLE9BQU8sRUFBRTtnQkFDTCxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTthQUNqRDtTQUNKLENBQUMsQ0FBQTtRQUVGLE1BQU0sT0FBTyxHQUFHOzs7Ozs7Ozs7O0dBVWpCLENBQUE7UUFDQyxNQUFNLFdBQVcsR0FBRzs7Ozs7O0dBTXJCLENBQUE7UUFFQyxNQUFNLElBQUksR0FBRyxNQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDakQsTUFBTSxLQUFLLEdBQUcsTUFBTSxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0NBQUE7QUFFRCxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFFM0MsTUFBTSxTQUFTLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXZELElBQUksUUFBUSxHQUFrQixFQUFFLENBQUM7QUFFakMsWUFBWSxDQUFDLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQTtBQUVyQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFHdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFHMUIsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNoQixPQUFPO0tBQ1Y7SUFHRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNuRCxPQUFPO0tBQ1Y7SUFFRCxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUE7QUFFRixTQUFlLGFBQWEsQ0FBQyxHQUFvQjs7UUFDN0MsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQyxLQUFLLE1BQU0sYUFBYSxJQUFJLFFBQVEsRUFBRTtZQUNsQyxJQUFJO2dCQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN2QyxTQUFTO2lCQUNaO2dCQUNELE1BQU0sYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3hEO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNuQjtTQUVKO0lBQ0wsQ0FBQztDQUFBO0FBRUQsU0FBUyxZQUFZLENBQUMsWUFBb0I7SUFHdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFxQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDN0UsT0FBTztLQUNWO0lBR0QsS0FBSyxNQUFNLFdBQVcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQW9CLEVBQUU7UUFDOUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsWUFBWSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3hFLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBNEIsQ0FBQztRQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ3pCO0FBQ0wsQ0FBQztBQUVELFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9
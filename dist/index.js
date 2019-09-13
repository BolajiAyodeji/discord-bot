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
      _id
      title
      type
      slug
      cuid
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBQ3ZDLGlDQUFpQztBQUVqQyxxREFBK0M7QUFDL0MsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLFNBQWUsSUFBSTs7UUFDZixNQUFNLFFBQVEsR0FBRywwQkFBMEIsQ0FBQTtRQUUzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLCtCQUFhLENBQUMsUUFBUSxFQUFFO1lBQzlDLE9BQU8sRUFBRTtnQkFDTCxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTthQUNqRDtTQUNKLENBQUMsQ0FBQTtRQUVGLE1BQU0sT0FBTyxHQUFHOzs7Ozs7Ozs7O0dBVWpCLENBQUE7UUFDQyxNQUFNLFdBQVcsR0FBRzs7Ozs7Ozs7OztHQVVyQixDQUFBO1FBT0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxhQUFhLENBQUMsT0FBTyxDQUFRLE9BQU8sQ0FBQyxDQUFBO1FBQ3hELE1BQU0sS0FBSyxHQUFHLE1BQU0sYUFBYSxDQUFDLE9BQU8sQ0FBUSxXQUFXLENBQUMsQ0FBQTtRQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztDQUFBO0FBRUQsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBRTNDLE1BQU0sU0FBUyxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUV2RCxJQUFJLFFBQVEsR0FBa0IsRUFBRSxDQUFDO0FBRWpDLFlBQVksQ0FBQyxHQUFHLFNBQVMsV0FBVyxDQUFDLENBQUE7QUFFckMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBR3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBRzFCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDaEIsT0FBTztLQUNWO0lBR0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbkQsT0FBTztLQUNWO0lBRUQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBZSxhQUFhLENBQUMsR0FBb0I7O1FBQzdDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5RSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0MsS0FBSyxNQUFNLGFBQWEsSUFBSSxRQUFRLEVBQUU7WUFDbEMsSUFBSTtnQkFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDdkMsU0FBUztpQkFDWjtnQkFDRCxNQUFNLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4RDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDbkI7U0FFSjtJQUNMLENBQUM7Q0FBQTtBQUVELFNBQVMsWUFBWSxDQUFDLFlBQW9CO0lBR3RDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBcUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzdFLE9BQU87S0FDVjtJQUdELEtBQUssTUFBTSxXQUFXLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFvQixFQUFFO1FBQzlELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLFlBQVksSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN4RSxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQTRCLENBQUM7UUFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUN6QjtBQUNMLENBQUM7QUFFRCxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMifQ==
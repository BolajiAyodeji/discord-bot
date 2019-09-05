import * as Discord from 'discord.js';
import { IBotCommand } from '../api';

export default class testCommand implements IBotCommand {
    
    private readonly _command = "testCommand"
    
    help(): string {
        return "This does nothing!!!";
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        msgObject.channel.send('It worked!!');
    }
}
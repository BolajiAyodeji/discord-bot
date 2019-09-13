"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ama {
    constructor() {
        this._command = "ama";
    }
    help() {
        return "This does nothing!!!";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        msgObject.channel.send('AMA');
    }
}
exports.default = ama;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2FtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQXFCLEdBQUc7SUFBeEI7UUFFcUIsYUFBUSxHQUFHLEtBQUssQ0FBQTtJQVdyQyxDQUFDO0lBVEcsSUFBSTtRQUNBLE9BQU8sc0JBQXNCLENBQUM7SUFDbEMsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjtRQUN6RSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0o7QUFiRCxzQkFhQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class question {
    constructor() {
        this._command = "question";
    }
    help() {
        return "This does nothing!!!";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        msgObject.channel.send('It worked!!');
    }
}
exports.default = question;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFxQixRQUFRO0lBQTdCO1FBRXFCLGFBQVEsR0FBRyxVQUFVLENBQUE7SUFXMUMsQ0FBQztJQVRHLElBQUk7UUFDQSxPQUFPLHNCQUFzQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7UUFDekUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKO0FBYkQsMkJBYUMifQ==
import { Dispatcher } from "./dispatcher";
import { InsertIntoDb } from '../database/db';
import { Hasher } from "./crypto/hasher";
import { KudoDocument } from "../models/kudo-document";
import { SentKudosBlock } from "../models/constants/blocks";


export class SendDispatcher extends Dispatcher {
    private readonly UserIdRegex = '<\@([a-zA-Z0-9])*\|([a-zA-Z0-9-])*>';

    constructor(args: string[], sourceCommand: any) {
        super(args, sourceCommand);
    }

    dispatch = async () => {
        let user = this.args.shift();
        let message = this.args.join(" ");

        let reg = new RegExp(this.UserIdRegex);
        if(!user.match(reg) || message.length === 0)
            throw new Error('Error dispatching send command!');

        let hasher = new Hasher(user.substring(2, user.indexOf('|')));
        let hashOutput = await hasher.generateHash();

        let kudoDocument = <KudoDocument>{
            userIdHash: hashOutput,
            message: message,
            sender: this.sourceCommand.user_name
        };
        await InsertIntoDb(kudoDocument);
        return SentKudosBlock;
    }
}

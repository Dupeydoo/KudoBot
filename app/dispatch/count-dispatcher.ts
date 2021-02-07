import { CountKudosInDb } from "../database/db";
import { KudoCountBlock } from "../models/constants/blocks";
import { Hasher } from "./crypto/hasher";
import { Dispatcher } from "./dispatcher";

export class CountDispatcher extends Dispatcher {
    constructor(args: string[], sourceCommand: any) {
        super(args, sourceCommand);
    }

    dispatch = async () => {
        const userId = this.sourceCommand.user_id;
        
        let hasher = new Hasher(userId);
        const hash = await hasher.generateHash();

        let result = await CountKudosInDb({ userIdHash: hash }) as number;
        return this.buildBlockResult(result);
    }

    private buildBlockResult(count: number) {
        let result = KudoCountBlock;
        result.blocks[0].text.text = 
            `You have *${count}* Kudos! Keep it up! :smile:`;
        return result;
    }
}
import { ListFromDb } from "../database/db";
import { ListEndBlock, ListStartBlock } from "../models/constants/blocks";
import { KudoDocument } from "../models/kudo-document";
import { Hasher } from "./crypto/hasher";
import { Dispatcher } from "./dispatcher";

export class ListDispatcher extends Dispatcher {
    constructor(args: string[], sourceCommand: any) {
        super(args, sourceCommand);
    }

    dispatch = async () => {
        const userId = this.sourceCommand.user_id;
        
        let hasher = new Hasher(userId);
        const hash = await hasher.generateHash();

        let result = await ListFromDb({ userIdHash: hash }) as KudoDocument[];
        return this.buildBlockResult(result);
    }

    private buildBlockResult = (docs: KudoDocument[]) => {
        let kudosBlocks = docs.reduce((acc, cv) => [...acc, {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `:white_check_mark: *${cv.message}*\n${cv.sender}`
            }
        }], []);
        return { blocks: [ ...ListStartBlock, ...kudosBlocks, ...ListEndBlock ] };
    }
}
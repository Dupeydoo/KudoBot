import { ListFromDb } from "../database/db";
import { ListEndBlock, ListStartBlock } from "../models/constants/blocks";
import { KudoDocument } from "../models/kudo-document";
import { Hasher } from "./crypto/hasher";
import { Dispatcher } from "./dispatcher";

export class ListDispatcher extends Dispatcher {
    private readonly PageSize = 5;
    private readonly SortColumn = 'sender';

    constructor(args: string[], sourceCommand: any) {
        super(args, sourceCommand);
    }

    dispatch = async () => {
        let value = this.sourceCommand.value?.split('|');

        const UserId = value ? value[1] : this.sourceCommand.user_id;
        const PageNum = value ? +value[0] : 0;
        
        let hasher = new Hasher(UserId);
        const hash = await hasher.generateHash();

        let result = await ListFromDb({ userIdHash: hash },
            this.SortColumn, this.PageSize, PageNum) as KudoDocument[];

        if(result.length === 0)
            return "That's all folks!";
        return this.buildBlockResult(result, PageNum, UserId);
    }

    private buildBlockResult = (docs: KudoDocument[], 
        pageNum: number, userId: string) => {
        let kudosBlocks = docs.reduce((acc, cv) => [...acc, {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `:white_check_mark: *${cv.message}*\n${cv.sender}`
            }
        }], []);

        let end = ListEndBlock;
        end[1].elements[0].value = `${pageNum + 1}|${userId}`;
        return { blocks: [ ...ListStartBlock, ...kudosBlocks, ...end ] };
    }
}
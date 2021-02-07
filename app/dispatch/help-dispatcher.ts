import { HelpBlock } from "../models/constants/blocks";
import { Dispatcher } from "./dispatcher";

export class HelpDispatcher extends Dispatcher {
    constructor(args: string[], sourceCommand: any) {
        super(args, sourceCommand);
    }

    dispatch = async () => {
        return HelpBlock;
    }
}
import { KudoInstruction } from "../models/constants/kudo-instruction";

export class KudoValidator {
    constructor(private command : string) {}

    validate = () : boolean => {
        let rawInstruction = this.command.split(' ')[0];
        let instruction = rawInstruction as KudoInstruction;

        if(!Object.values(KudoInstruction).includes(instruction))
            throw new Error('Invalid Kudo command provided.');
        return true;
    }
}
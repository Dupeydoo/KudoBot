import { KudoCommand } from "../models/kudo-command";
import { KudoValidator } from "../validation/kudo-validator"

export class KudoParser {
    constructor(private command: string) {}

    parse = (): KudoCommand => {
        let validator = new KudoValidator(this.command);
        validator.validate();

        let parseParts = this.command.split(' ');
        let instruction = parseParts.shift();

        return <KudoCommand> {
            instruction: instruction,
            arguments: parseParts
        }
    }
}
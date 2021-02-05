import { KudoInstruction } from "./constants/kudo-instruction";

export interface KudoCommand {
    instruction: KudoInstruction,
    arguments: string[]
}
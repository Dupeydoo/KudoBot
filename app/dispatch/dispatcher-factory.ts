import { KudoInstruction } from "../models/constants/kudo-instruction";
import { KudoCommand } from "../models/kudo-command";
import { SendDispatcher } from "./send-dispatcher";
import { Dispatcher } from "./dispatcher";
import { ListDispatcher } from "./list-dispatcher";
import { CountDispatcher } from "./count-dispatcher";
import { HelpDispatcher } from "./help-dispatcher";


export class DispatcherFactory {
    static createInstance = (command: KudoCommand, 
        sourceCommand: any): Dispatcher => {
        switch (command.instruction) {
            case KudoInstruction.Send:
                return new SendDispatcher(command.arguments, sourceCommand);

            case KudoInstruction.List:
                return new ListDispatcher(command.arguments, sourceCommand);

            case KudoInstruction.Count:
                return new CountDispatcher(command.arguments, sourceCommand);

            default:
                return new HelpDispatcher(command.arguments, sourceCommand);
        }
    };
}

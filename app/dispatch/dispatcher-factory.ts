import { KudoInstruction } from "../models/constants/kudo-instruction";
import { KudoCommand } from "../models/kudo-command";
import { SendDispatcher } from "./send-dispatcher";
import { Dispatcher } from "./dispatcher";
import { ListDispatcher } from "./list-dispatcher";


export class DispatcherFactory {
    static createInstance = (command: KudoCommand, 
        sourceCommand: any): Dispatcher => {
        switch (command.instruction) {
            case KudoInstruction.Send:
                return new SendDispatcher(command.arguments, sourceCommand);

            case KudoInstruction.List:
                return new ListDispatcher(command.arguments, sourceCommand);
        }
    };
}

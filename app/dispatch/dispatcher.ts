export abstract class Dispatcher {
    constructor(protected args: string[], protected sourceCommand: any) {}
    abstract dispatch();
}
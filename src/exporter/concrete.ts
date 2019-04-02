
import { AbstractEmitter } from "./abstract";

export class ConcreteEmitter extends AbstractEmitter {

    output(obj: any): string {
        return this.outputHeader() + `
// TODO
        `;
    }
}
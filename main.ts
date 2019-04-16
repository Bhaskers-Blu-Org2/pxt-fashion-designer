enum BeadGesture {
    //% block="shake"
    Shake = JDGesture.Shake
}

/**
 * Bead stuff
 */
//% color=#0c0c00 icon="\uf111" weight=100
namespace fashion {
    //% fixedInstances
    export class Bead {
        private _client: jacdac.Client;

        constructor(client: jacdac.Client) {
            this._client = client;
        }

        /**
         * Gets the name of the bead on the JACDAC network
         */
        //% group="Properties"
        //% blockId=beadname block="%bead name"
        get name() {
            return this._client.name;
        }

        get client() {
            return this._client;
        }
    }

    //% fixedInstances
    export class MotionBead extends Bead {
        constructor(name: string) {
            super(new jacdac.AccelerometerClient(name));
        }

        /**
         * Registers code to run when a bead is run
         * @param gesture 
         * @param handler 
         */
        //% blockId=motionbeadongesture block="on motion %bead %gesture"
        //% group="Motion"
        onGesture(gesture: BeadGesture, handler: () => void) {
            const c = this.client as jacdac.AccelerometerClient;
            c.onEvent(<JDGesture><number>gesture, handler);
        }
    }

    // code to be generated...
    /**
     * Any motion bead attached to the garment
     */
    //% fixedInstance whenUsed block="any"
    export const motionAny = new MotionBead("any");
}

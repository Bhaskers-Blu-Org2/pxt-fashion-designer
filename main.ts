enum BeadGesture {
    //% block="shake"
    Shake
}

/**
 * Bead stuff
 */
//% color=#0c0c00 icon="\uf111" weight=100
namespace fashion {
    //% fixedInstances
    export class Bead {
        _name: string;
        constructor(name: string) {
            // tell jacdac about the name
            this._name = name;
        }

        get name() {
            return this._name;
        }
    }

    //% fixedInstances
    export class MotionBead extends Bead {
        constructor(name: string) {
            super(name);
        }

        /**
         * Registers code to run when a bead is run
         * @param gesture 
         * @param handler 
         */
        //% blockId=motionbeadongesture block="on motion %bead %gesture"
        //% group="Motion"
        onGesture(gesture: BeadGesture, handler: () => void) {
        }
    }

    // code to be generated...
    /**
     * Any motion bead attached to the garment
     */
    //% fixedInstance whenUsed block="any"
    export const motionAny = new MotionBead("any");
}

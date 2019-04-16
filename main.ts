/**
 * Bead stuff
 */
//% color=#0c0c00 icon="\uf111" weight=100
//% groups='["Motion", "Light"]'
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
        //% blockId=motionbeadongesture block="on %bead %gesture"
        //% group="Motion"
        onGesture(gesture: JDGesture, handler: () => void) {
            const c = this.client as jacdac.AccelerometerClient;
            c.onEvent(gesture, handler);
        }
    }

    /**
     * Any motion bead attached to the garment
     */
    //% fixedInstance whenUsed block="motion bead"
    export const motionBead = new MotionBead("motion bead");

    //% fixedInstances
    export class LightBead extends Bead {
        constructor(name: string) {
            super(new jacdac.LightClient(name));
        }

        /**
         * Show an animation or queue an animation in the animation queue
         * @param animation the animation to run
         * @param duration the duration to run in milliseconds, eg: 500
         */
        //% blockId=beadlight_show_animation block="show %strip animation %animation for %duration=timePicker ms"
        //% weight=90 blockGap=8
        //% group="Light"
        showAnimation(animation: JDLightAnimation, duration: number) {
            const c = this.client as jacdac.LightClient;
            c.showAnimation(animation, 500)
        }
    }

    /**
     * Any light bead attached to the garment
     */
    //% fixedInstance whenUsed block="light bead"
    export const lightBead = new LightBead("light bead");
}

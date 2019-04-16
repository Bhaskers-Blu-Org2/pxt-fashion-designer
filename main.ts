/**
 * Bead stuff
 */
//% color=#0c0c00 icon="\uf111" weight=100
//% groups='["Motion", "Light Sensor" "Light"]'
namespace fashion {
    //% fixedInstances
    export class Bead {
        private _client: jacdac.Client;

        constructor(client: jacdac.Client) {
            this._client = client;
        }

        get name() {
            return this._client.name;
        }

        get client() {
            return this._client;
        }
    }

    /**
     * A motion detector bead
     */
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

    /**
     * A light sensor bead
     */
    //% fixedInstances
    export class LightSensorBead extends Bead {
        constructor(name: string) {
            super(new jacdac.LightSensorClient(name));
        }

        /**
         * Runs code when an event happens on the sensor
         * @param gesture 
         * @param handler 
         */
        //% blockId=beadslightsensoronevent block="jacdac %lightsensor on %lightCondition"
        //% group="Light sensor"
        onEvent(lightCondition: JacdacLightCondition, handler: () => void) {
            const c = this.client as jacdac.LightSensorClient;
            c.onEvent(lightCondition, handler);
        }

        /**
         * Sets the threshold value for the event
         * @param level 
         * @param value 
         */
        //% blockId=beadslightsetthrshold block="jacdac %lightsensor set threshold %level to %value"
        //% group="Light sensor"
        setLightConditionThreshold(level: JacdacLightCondition, value: number) {
            const c = this.client as jacdac.LightSensorClient;
            c.setLightConditionThreshold(level, value);
        }
    }

    /**
     * Any light bead attached to the garment
     */
    //% fixedInstance whenUsed block="light sensor bead"
    export const lightSensorBead = new LightSensorBead("light sensor bead");

    /**
     * A programmable light bead
     */
    //% fixedInstances
    export class LightBead extends Bead {
        constructor(name: string) {
            super(new jacdac.LightClient(name));
        }

        /**
         * Set all of the pixels on the strip to one RGB color.
         * @param rgb RGB color of the LED
         */
        //% blockId="beadlight_set_strip_color" block="set %strip all pixels to %rgb=colorNumberPicker"
        //% weight=80 blockGap=8
        //% group="Light"
        setAll(rgb: number) {
            const c = this.client as jacdac.LightClient;
            c.setAll(rgb);
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

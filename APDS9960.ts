/* #region Helper Functions */

function reverseString(str: string) {
    let newString = "";
    for (let j = str.length - 1; j >= 0; j--) {
        newString += str[j]; // or newString = newString + str[i];
    }
    return newString; // "olleh"
}

function DecimalToHex(n: number) {

    let temp = n;
    let rem = 0;
    let retString = "";

    while (temp != 0) {
        rem = temp % 16;

        if (rem > 9) {
            let remVal = "";
            switch (rem) {
                case 10:
                    remVal = "A";
                    break;
                case 11:
                    remVal = "B";
                    break;
                case 12:
                    remVal = "C";
                    break;
                case 13:
                    remVal = "D";
                    break;
                case 14:
                    remVal = "E";
                    break;
                case 15:
                    remVal = "F";
                    break;
            }
            retString += remVal;
        }
        else {
            retString += String.fromCharCode(rem + 48);
        }

        temp = Math.floor(temp / 16);
    }
    return "0x" + reverseString(retString);
}

/* #endregion */


/**
 * Makecode APDS9960 Proximity, Light, RGB, and Gesture Sensor package.
 */

/* #region Register constants for APDS-9960 */


//I2C Adress 
const APDS9960_I2C_ADDRESS = 0x39

/* APDS-9960 register addresses */
const APDS9960_ENABLE = 0x80
const APDS9960_ATIME = 0x81
const APDS9960_WTIME = 0x83
const APDS9960_AILTL = 0x84
const APDS9960_AILTH = 0x85
const APDS9960_AIHTL = 0x86
const APDS9960_AIHTH = 0x87
const APDS9960_PILT = 0x89
const APDS9960_PIHT = 0x8B
const APDS9960_PERS = 0x8C
const APDS9960_CONFIG1 = 0x8D
const APDS9960_PPULSE = 0x8E
const APDS9960_CONTROL = 0x8F
const APDS9960_CONFIG2 = 0x90
const APDS9960_ID = 0x92
const APDS9960_STATUS = 0x93
const APDS9960_CDATAL = 0x94
const APDS9960_CDATAH = 0x95
const APDS9960_RDATAL = 0x96
const APDS9960_RDATAH = 0x97
const APDS9960_GDATAL = 0x98
const APDS9960_GDATAH = 0x99
const APDS9960_BDATAL = 0x9A
const APDS9960_BDATAH = 0x9B
const APDS9960_PDATA = 0x9C
const APDS9960_POFFSET_UR = 0x9D
const APDS9960_POFFSET_DL = 0x9E
const APDS9960_CONFIG3 = 0x9F
const APDS9960_GPENTH = 0xA0
const APDS9960_GEXTH = 0xA1
const APDS9960_GCONF1 = 0xA2
const APDS9960_GCONF2 = 0xA3
const APDS9960_GOFFSET_U = 0xA4
const APDS9960_GOFFSET_D = 0xA5
const APDS9960_GOFFSET_L = 0xA7
const APDS9960_GOFFSET_R = 0xA9
const APDS9960_GPULSE = 0xA6
const APDS9960_GCONF3 = 0xAA
const APDS9960_GCONF4 = 0xAB
const APDS9960_GFLVL = 0xAE
const APDS9960_GSTATUS = 0xAF
const APDS9960_IFORCE = 0xE4
const APDS9960_PICLEAR = 0xE5
const APDS9960_CICLEAR = 0xE6
const APDS9960_AICLEAR = 0xE7
const APDS9960_GFIFO_U = 0xFC
const APDS9960_GFIFO_D = 0xFD
const APDS9960_GFIFO_L = 0xFE
const APDS9960_GFIFO_R = 0xFF

// On/Off definitions
const OFF = 0
const ON = 1


/* #endregion */

/* #region Enums for Modes, etc */

// Parameters for setting modes
enum SETTING_MODES {
    POWER = 0,
    AMBIENT_LIGHT = 1,
    PROXIMITY = 2,
    WAIT = 3,
    AMBIENT_LIGHT_INT = 4,
    PROXIMITY_INT = 5,
    GESTURE = 6,
    ALL = 7
}

// ALS Gain (AGAIN) values
enum APDS_9960_AGAIN {
    AGAIN_1 = 0,
    AGAIN_4 = 1,
    AGAIN_16 = 2,
    AGAIN_64 = 3
}

// Proximity Gain (PGAIN) values
enum APDS_9960_PGAIN {
    PGAIN_1 = 0,
    PGAIN_2 = 1,
    PGAIN_4 = 2,
    PGAIN_8 = 3
}

// Gesture Gain (GGAIN) values
enum APDS_9960_GGAIN {
    GGAIN_1 = 0,
    GGAIN_2 = 1,
    GGAIN_4 = 2,
    GGAIN_8 = 3
}

// LED Drive values
enum APDS_9960_LED_DRIVE {
    LED_DRIVE_100MA = 0,
    LED_DRIVE_50MA = 1,
    LED_DRIVE_25MA = 2,
    LED_DRIVE_12_5MA = 3
}

// LED Boost values
enum APDS_9960_LED_BOOST {
    LED_BOOST_100 = 0,
    LED_BOOST_150 = 1,
    LED_BOOST_200 = 2,
    LED_BOOST_300 = 3
}

// Gesture wait time values
enum APDS_9960_GWTIME {
    GWTIME_0MS = 0,
    GWTIME_2_8MS = 1,
    GWTIME_5_6MS = 2,
    GWTIME_8_4MS = 3,
    GWTIME_14_0MS = 4,
    GWTIME_22_4MS = 5,
    GWTIME_30_8MS = 6,
    GWTIME_39_2MS = 7
}

/* #endregion */

/* #region Default values (taken from Sparkfun library) */

const DEFAULT_ATIME = 219     // 103ms
const DEFAULT_WTIME = 246     // 27ms
const DEFAULT_PROX_PPULSE = 0x87    // 16us, 8 pulses
const DEFAULT_GESTURE_PPULSE = 0x89    // 16us, 10 pulses
const DEFAULT_POFFSET_UR = 0       // 0 offset
const DEFAULT_POFFSET_DL = 0       // 0 offset      
const DEFAULT_CONFIG1 = 0x60    // No 12x wait (WTIME) factor
const DEFAULT_LDRIVE = APDS_9960_LED_DRIVE.LED_DRIVE_100MA
const DEFAULT_PGAIN = APDS_9960_PGAIN.PGAIN_4
const DEFAULT_AGAIN = APDS_9960_AGAIN.AGAIN_4
const DEFAULT_PILT = 0       // Low proximity threshold
const DEFAULT_PIHT = 50      // High proximity threshold
const DEFAULT_AILT = 0xFFFF  // Force interrupt for calibration
const DEFAULT_AIHT = 0
const DEFAULT_PERS = 0x22    // 2 consecutive prox or ALS for int.
const DEFAULT_CONFIG2 = 0x01    // No saturation interrupts or LED boost  
const DEFAULT_CONFIG3 = 0       // Enable all photodiodes, no SAI
const DEFAULT_GPENTH = 40      // Threshold for entering gesture mode
const DEFAULT_GEXTH = 30      // Threshold for exiting gesture mode    
const DEFAULT_GCONF1 = 0x40    // 4 gesture events for int., 1 for exit
const DEFAULT_GGAIN = APDS_9960_GGAIN.GGAIN_4
const DEFAULT_GLDRIVE = APDS_9960_LED_DRIVE.LED_DRIVE_100MA
const DEFAULT_GWTIME = APDS_9960_GWTIME.GWTIME_2_8MS
const DEFAULT_GOFFSET = 0       // No offset scaling for gesture mode
const DEFAULT_GPULSE = 0xC9    // 32us, 10 pulses
const DEFAULT_GCONF3 = 0       // All photodiodes active during gesture
const DEFAULT_GIEN = 0 // Disable gesture interrupts

/* #endregion */

namespace APDS9960 {

    //Set I2C address of device
    let APDS9960_I2C_ADDR = APDS9960_I2C_ADDRESS;

    //Create buffer for register
    let _wbuf = pins.createBuffer(2);

    //Set ALS and Proximity gain
    let _AGAIN = DEFAULT_AGAIN;
    let _PGAIN = DEFAULT_PGAIN;

    /* #region General Purpose Set/Get Register Functions */

    /**
     * Set registers of the APDS9960
     */
    function setRegister(reg: number, dat: number): void {
        _wbuf[0] = reg | 0xA0;
        _wbuf[1] = dat;
        pins.i2cWriteBuffer(APDS9960_I2C_ADDR, _wbuf);
    }

    /**
     * Get a single register of the APDS9960
     */
    function getOneRegister(reg: number): number {
        pins.i2cWriteNumber(APDS9960_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(APDS9960_I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * Get two registers of the APDS9960, in UInt16LE format
     */
    function getTwoRegister(reg: number): number {
        pins.i2cWriteNumber(APDS9960_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(APDS9960_I2C_ADDR, NumberFormat.UInt16LE);
    }

    /* #endregion */

    /* #region Turn APDS9960 ON/OFF */

    export function PowerOn() {
        let t = getOneRegister(APDS9960_ENABLE)
        t |= 1
        setRegister(APDS9960_ENABLE, t)
        basic.pause(3)
    }

    export function PowerOff() {
        let t = getOneRegister(APDS9960_ENABLE)
        t &= 0xFE
        setRegister(APDS9960_ENABLE, t)
    }

    /* #endregion */

    /* #region Turn ALS, Gestures, Proximity ON/OFF */

    export function ALSEnable(en: boolean = true) {
        let t = getOneRegister(APDS9960_ENABLE)
        //FD = 11111101
        t &= 0xFD
        if (en) t |= 2
        setRegister(APDS9960_ENABLE, t)
    }

    export function ProximityEnable(en: boolean = true) {
        let t = getOneRegister(APDS9960_ENABLE)
        //FB = 11111011
        t &= 0xFB
        if (en) t |= 4
        setRegister(APDS9960_ENABLE, t)
    }

    export function WaitEnable(en: boolean = true) {
        let t = getOneRegister(APDS9960_ENABLE)
        //F7 = 11110111
        t &= 0xF7
        if (en) t |= 8
        setRegister(APDS9960_ENABLE, t)
    }

    export function GestureEnable(en: boolean = true) {
        let t = getOneRegister(APDS9960_ENABLE)
        //F7 = 10111111
        t &= 0xBF
        if (en) t |= 64
        setRegister(APDS9960_ENABLE, t)
    }

    /* #endregion */

    /* #region Setting ALS / Proximity Functions */

    export function DisableAllFeatures() {
        //Turn everything off / disable all features
        setRegister(APDS9960_ENABLE, OFF);
    }

    export function SetALSGain(aGain: APDS_9960_AGAIN) {
        let t = getOneRegister(APDS9960_CONTROL);
        t &= 0xFC;
        switch (aGain) {
            case APDS_9960_AGAIN.AGAIN_1:
                t |= 0;
                break;
            case APDS_9960_AGAIN.AGAIN_4:
                t |= 1;
                break;
            case APDS_9960_AGAIN.AGAIN_16:
                t |= 2;
                break;
            case APDS_9960_AGAIN.AGAIN_64:
                t |= 3;
                break;
        }
        setRegister(APDS9960_CONTROL, t);

        _AGAIN = aGain;
    }

    export function SetProximityGain(pGain: APDS_9960_PGAIN) {
        let t = getOneRegister(APDS9960_CONTROL);
        t &= 0xF3;
        switch (pGain) {
            case APDS_9960_PGAIN.PGAIN_1:
                t |= 0;
                break;
            case APDS_9960_PGAIN.PGAIN_2:
                t |= 4;
                break;
            case APDS_9960_PGAIN.PGAIN_4:
                t |= 8;
                break;
            case APDS_9960_PGAIN.PGAIN_8:
                t |= 12;
                break;
        }
        setRegister(APDS9960_CONTROL, t);
        _PGAIN = pGain;
    }

    export function SetLEDDriveStrength(lStrength: APDS_9960_LED_DRIVE) {
        let t = getOneRegister(APDS9960_CONTROL);
        t &= 0x3F;
        switch (lStrength) {
            case APDS_9960_LED_DRIVE.LED_DRIVE_100MA:
                t |= 0;
                break;
            case APDS_9960_LED_DRIVE.LED_DRIVE_50MA:
                t |= 64;
                break;
            case APDS_9960_LED_DRIVE.LED_DRIVE_25MA:
                t |= 128;
                break;
            case APDS_9960_LED_DRIVE.LED_DRIVE_12_5MA:
                t |= 192;
                break;
        }
        setRegister(APDS9960_CONTROL, t);
    }

    export function SetProxIntLowThresh(pilt: number) {
        let t = getOneRegister(APDS9960_PILT);
        t &= 0;
        t |= pilt;
        setRegister(APDS9960_PILT, t);
    }

    export function SetProxIntHighThresh(piht: number) {
        let t = getOneRegister(APDS9960_PIHT);
        t &= 0;
        t |= piht;
        setRegister(APDS9960_PILT, t);
    }

    export function SetLightIntLowThreshold(threshold: number) {
        let val_low = threshold & 0x00FF;
        let val_high = (threshold & 0xFF00) >> 8;

        let atl = getOneRegister(APDS9960_AILTL);
        atl &= 0;
        atl |= val_low;
        setRegister(APDS9960_AILTL, atl);

        let ath = getOneRegister(APDS9960_AILTH);
        ath &= 0;
        ath |= val_high;
        setRegister(APDS9960_AILTL, ath);

    }

    export function SetLightIntHighThreshold(threshold: number) {
        let val_low = threshold & 0x00FF;
        let val_high = (threshold & 0xFF00) >> 8;

        let atl = getOneRegister(APDS9960_AIHTL);
        atl &= 0;
        atl |= val_low;
        setRegister(APDS9960_AIHTL, atl);

        let ath = getOneRegister(APDS9960_AIHTH);
        ath &= 0;
        ath |= val_high;
        setRegister(APDS9960_AIHTH, ath);

    }

    /* #endregion */

    /* #region Setting Gesture Sensing Functions */

    export function SetGestureEnterThreshold(threshold: number) {
        let t = getOneRegister(APDS9960_GPENTH)
        t &= 0x00;
        t |= threshold;
        setRegister(APDS9960_GPENTH, t)
    }

    export function SetGestureExitThreshold(threshold: number) {
        let t = getOneRegister(APDS9960_GEXTH)
        t &= 0x00;
        t |= threshold;
        setRegister(APDS9960_GPENTH, t)
    }

    function SetGestureGain(gGain: APDS_9960_GGAIN) {
        let t = getOneRegister(APDS9960_GCONF2);
        t &= 0x9F;
        switch (gGain) {
            case APDS_9960_GGAIN.GGAIN_1:
                t |= 0;
                break;
            case APDS_9960_GGAIN.GGAIN_2:
                t |= 32;
                break;
            case APDS_9960_GGAIN.GGAIN_4:
                t |= 64;
                break;
            case APDS_9960_GGAIN.GGAIN_8:
                t |= 96;
                break;
        }
        setRegister(APDS9960_GCONF2, t);
    }

    export function SetGestureLEDDrive(gLEDDrive: APDS_9960_LED_DRIVE) {
        //HERE IS PROBLEM?
        let t = getOneRegister(APDS9960_CONFIG2);
        t &= 0xE7;
        switch (gLEDDrive) {
            case APDS_9960_LED_DRIVE.LED_DRIVE_100MA:
                t |= 0;
                break;
            case APDS_9960_LED_DRIVE.LED_DRIVE_50MA:
                t |= 8;
                break;
            case APDS_9960_LED_DRIVE.LED_DRIVE_25MA:
                t |= 16;
                break;
            case APDS_9960_LED_DRIVE.LED_DRIVE_12_5MA:
                t |= 24;
                break;
        }
        setRegister(APDS9960_GCONF2, t);
    }

    export function SetGestureWaitTime(gWTime: APDS_9960_GWTIME) {
        let t = getOneRegister(APDS9960_CONFIG2);
        t &= 0xF8;
        switch (gWTime) {
            case APDS_9960_GWTIME.GWTIME_0MS:
                t |= 0;
                break;
            case APDS_9960_GWTIME.GWTIME_2_8MS:
                t |= 1;
                break;
            case APDS_9960_GWTIME.GWTIME_5_6MS:
                t |= 2;
                break;
            case APDS_9960_GWTIME.GWTIME_8_4MS:
                t |= 3;
                break;
            case APDS_9960_GWTIME.GWTIME_14_0MS:
                t |= 4;
                break;
            case APDS_9960_GWTIME.GWTIME_22_4MS:
                t |= 5;
                break;
            case APDS_9960_GWTIME.GWTIME_30_8MS:
                t |= 6;
                break;
            case APDS_9960_GWTIME.GWTIME_39_2MS:
                t |= 7;
                break;
        }
        setRegister(APDS9960_GCONF2, t);
    }

    export function SetGestureIntEnabled(enable: number) {
        let t = getOneRegister(APDS9960_GCONF4);
        t &= 0xFD;
        t |= enable;
        setRegister(APDS9960_GCONF4, t);
    }

    /* #endregion */

    /* #region Initialization functions */

    function SetALSProximityDefaultValues() {
        //ADC integration time
        //not setting here??
        setRegister(APDS9960_ATIME, DEFAULT_ATIME);

        //Wait time (non-gesture)
        setRegister(APDS9960_WTIME, DEFAULT_WTIME);

        setRegister(APDS9960_PPULSE, 8);

        //Proximity Offset UP/RIGHT
        setRegister(APDS9960_POFFSET_UR, 0);

        //Proximity Offset DOWN/LEFT
        setRegister(APDS9960_POFFSET_DL, 0);

        // No 12x wait (WTIME) factor
        setRegister(APDS9960_CONFIG1, 0x60);

        SetLEDDriveStrength(DEFAULT_LDRIVE);

        SetProximityGain(DEFAULT_PGAIN);

        SetALSGain(DEFAULT_AGAIN);

        SetProxIntLowThresh(DEFAULT_PILT);

        SetProxIntHighThresh(DEFAULT_PIHT);

        //TODO: WHY DOES THIS NOT WORK??
        SetLightIntLowThreshold(DEFAULT_AILT);

        SetLightIntHighThreshold(DEFAULT_AIHT);

        // //Set Proximity interrupt to 2 consecutive proximity values out of range
        // //and set ALS interrupt to 2 consecutive Ch0 channel values out of range
        setRegister(APDS9960_PERS, DEFAULT_PERS);

        // Set no saturation interrupts or LED boost 
        setRegister(APDS9960_CONFIG2, DEFAULT_CONFIG2);

        // Set to enable all photodiodes, no SAI
        setRegister(APDS9960_CONFIG3, DEFAULT_CONFIG3);

    }

    function SetGestureDefaultValues() {

        SetGestureEnterThreshold(DEFAULT_GPENTH);

        SetGestureExitThreshold(DEFAULT_GPENTH);

        //FAIL HERE
        // //Set 4 gesture events for int., 1 for exit
        setRegister(APDS9960_GCONF1, DEFAULT_GCONF1);

        // //Set gesture gain control to 4x
        SetGestureGain(DEFAULT_GGAIN);

        //FAILING HERE
        // //Set Gesture LED Drive strength to 100 mA
        //SetGestureLEDDrive(DEFAULT_GLDRIVE);

        // //Set gesture wait time to 2.0 ms
        //SetGestureWaitTime(DEFAULT_GWTIME);

        // // No offset scaling for all the gesture modes

        setRegister(APDS9960_GOFFSET_U, DEFAULT_GOFFSET);

        setRegister(APDS9960_GOFFSET_D, DEFAULT_GOFFSET);

        setRegister(APDS9960_GOFFSET_L, DEFAULT_GOFFSET);

        setRegister(APDS9960_GOFFSET_R, DEFAULT_GOFFSET);

        // //Set 32us, 10 pulses
        setRegister(APDS9960_GPULSE, DEFAULT_GPULSE);

        // //Set all the photodiodes active during gestures
        setRegister(APDS9960_GCONF3, DEFAULT_GCONF3);

        //FAILING HERE
        // //Set disable gesture interrupts
        //SetGestureIntEnabled(DEFAULT_GIEN);

    }

    /* #endregion */

    /* #region Getting ALS, Gestures, Proximity, Color functions */

    export function getProximity(): number {
        return Math.idiv(getOneRegister(APDS9960_PDATA), _PGAIN)
    }

    /* #endregion */

    export function init(debugging: boolean) {

        //Make sure everything is off and set default values
        DisableAllFeatures();

        //Set default values for ambient light and proximity registers
        SetALSProximityDefaultValues();

        //Set default values for gesture sense registers
        SetGestureDefaultValues();

        //Turn on proximity
        //ALSEnable();

        //Turn device on
        //PowerOn();

        if (debugging)
            debug();
    }

    export function adafruitInit(debugging: boolean) {



    }

    export function debug() {

        let reg = 0;
        let val = 0;

        for (reg = 0x80; reg <= 0xAF; reg++) {
            if ((reg != 0x82) &&
                (reg != 0x8A) &&
                (reg != 0x91) &&
                (reg != 0xA8) &&
                (reg != 0xAC) &&
                (reg != 0xAD)) {
                val = getOneRegister(reg);
                //serial.writeString("" + DecimalToHex(reg));
                //serial.writeString(": ");
                //serial.writeLine("" + DecimalToHex(val));
            }
        }

        for (reg = 0xE4; reg <= 0xE7; reg++) {
            val = getOneRegister(reg);
            //serial.writeString("" + DecimalToHex(reg));
            //serial.writeString(": ");
            //serial.writeLine("" + DecimalToHex(val));
        }

    }

}

APDS9960.init(false);

basic.forever(function () {
    APDS9960.debug();
    basic.pause(2000);
})
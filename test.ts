jacdac.accelerometer.setStreaming(true);
jacdac.microhpone.setStreaming(true);
jacdac.lightSensor.setStreaming(true);
jacdac.button.setStreaming(true);
jacdac.touch.setStreaming(true);
jacdac.monitorBatteryLevels(function (serialNumber: number, level: number) {
    console.log(`bat ${serialNumber} ${level}`)
})
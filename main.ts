namespace jdebugger {
    const hexBuf = control.createBuffer(4);
    function toHex(n: number): string {
        hexBuf.setNumber(NumberFormat.UInt32LE, 0, n);
        return hexBuf.toHex();
    }

    enum Mode {
        Drivers,
        Devices
    }
    let mode = Mode.Drivers;

    function showDrivers() {
        const drivers = jacdac.drivers();
        console.log(`${drivers.length} drivers`)
        drivers.forEach(d => console.log(" " + d))
        console.log("");
    }

    function showDevices() {
        const drivers = jacdac.drivers();
        let serials: any = {};
        drivers.forEach(d => {
            if (!serials[d.serialNumber]) {
                serials[d.serialNumber] = d;
            }
        })
        const devs = Object.keys(serials);
        console.log(`${devs.length} devices`)
        devs.forEach(d => console.log(` ${d}`));
        console.log("");
    }

    function refresh() {
        if (!jacdac.isConnected()) {
            console.log(`jd> disconnected`);
            return;
        }
        switch (mode) {
            case Mode.Drivers: showDrivers(); break;
            case Mode.Devices: showDevices(); break;
        }
    }

    function init() {
        // start game engine
        game.splash("jacdac", "debugger");
        jacdac.onEvent(JacDacEvent.BusConnected, refresh);
        jacdac.onEvent(JacDacEvent.BusDisconnected, refresh);
        jacdac.onEvent(JacDacEvent.DriverChanged, refresh);
        controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
            mode = Mode.Drivers;
            refresh();
        })
        controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
            mode = Mode.Devices;
            refresh();
        })

        game.consoleOverlay.setVisible(true);
        console.log(`jd> debugger started`);
        console.log(`jd> press left for drivers`)
        console.log(`jd> press right for device`)
    }

    jacdac.listenConsole();

    init();
}
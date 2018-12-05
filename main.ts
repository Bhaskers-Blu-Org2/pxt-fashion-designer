namespace jdebugger {
    const hexBuf = control.createBuffer(4);
    function toHex(n: number): string {
        hexBuf.setNumber(NumberFormat.UInt32LE, 0, n);
        return hexBuf.toHex();
    }

    enum Mode {
        Drivers,
        Devices,
        Packets
    }
    let mode = Mode.Drivers;

    function showDrivers() {
        jacdac.clearBridge();
        const drivers = jacdac.drivers();
        console.log(`${drivers.length} drivers`)
        drivers.forEach(d => console.log(" " + d))
        console.log("");
    }

    function showDevices() {
        jacdac.clearBridge();
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

    function showPackets() {
        jacdac.logAllPackets();
    }

    function refresh() {
        if (!jacdac.isConnected()) {
            console.log(`jd> disconnected`);
            return;
        }
        switch (mode) {
            case Mode.Drivers: showDrivers(); break;
            case Mode.Devices: showDevices(); break;
            case Mode.Packets: showPackets(); break;
        }
    }

    function init() {
        game.currentScene(); // start game
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
        controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
            mode = Mode.Packets;
            console.log(`sniffing packets`)
            refresh();
        })

        game.consoleOverlay.setVisible(true);
        console.log(`jd> debugger started`);
        console.log(`jd> press left for drivers`)
        console.log(`jd> press right for device`)
        console.log(`jd> press down for packets`)
    }

    jacdac.broadcastBatteryLevel(() => 0);
    jacdac.broadcastConsole();

    init();
}
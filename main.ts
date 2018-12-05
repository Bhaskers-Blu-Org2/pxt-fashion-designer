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
        drivers.forEach(d => console.log(`${d}`))
        console.log("");
    }

    function showDevices() {
        jacdac.clearBridge();
        const drivers = jacdac.drivers();
        let serials: any = {};
        drivers.forEach(d => {
            const sn = toHex(d.serialNumber)
            if (!serials[sn]) {
                serials[sn] = d;
            }
        })
        const devs = Object.keys(serials);
        console.log(`${devs.length} devices`)
        devs.forEach(d => console.log(`${d}`));
        console.log("");
    }

    function showPackets() {
        jacdac.logAllPackets();
    }

    function refresh() {
        if (!jacdac.isConnected()) {
            console.log(`disconnected`);
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
        jacdac.onEvent(JacDacEvent.BusConnected, () => {
            console.log(`connected`)
            refresh()
        });
        jacdac.onEvent(JacDacEvent.BusDisconnected, () => {
            console.log(`disconnected`)
            refresh()
        });
        jacdac.onEvent(JacDacEvent.DriverChanged, () => {
            console.log(`driver changed`)
            refresh()
        });
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
        console.log(`jacdac debugger`);
        console.log(`press left for drivers`)
        console.log(`press right for device`)
        console.log(`press down for packets`)
    }

    init();
}
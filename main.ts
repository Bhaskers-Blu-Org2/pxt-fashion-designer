namespace jdebugger {
    function toHex(n: number): string {
        const hexBuf = control.createBuffer(4);
        hexBuf.setNumber(NumberFormat.UInt32LE, 0, n);
        return hexBuf.toHex();
    }
    function toHex16(n: number): string {
        const hexBuf = control.createBuffer(2);
        hexBuf.setNumber(NumberFormat.UInt16LE, 0, n);
        return hexBuf.toHex();
    }
    function toHex8(n: number): string {
        const hexBuf = control.createBuffer(1);
        hexBuf.setNumber(NumberFormat.UInt8LE, 0, n);
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
        console.log(`serial address class`);
        console.log(` flags status`);
        drivers.forEach(d => {
            console.log(`${toHex(d.serialNumber)} ${toHex8(d.address)} ${toHex(d.driverClass)}`);
            let flags = " " + toHex16(d.flags) + " ";
            if (d.isVirtualDriver())
                flags += "virt";
            else if (d.isHostDriver())
                flags += "host";
            else if (d.isBroadcastDriver())
                flags += "broa";
            else if (d.isSnifferDriver())
                flags += "sniff";
            if (d.isPaired())
                flags += " paired";
            if (d.isPairing())
                flags += " pairing";
            if (d.flags & DAL.JD_DEVICE_FLAGS_CP_SEEN)
                flags += " cp"
            if (d.flags & DAL.JD_DEVICE_FLAGS_INITIALISED)
                flags += " inited"
            if (d.flags & DAL.JD_DEVICE_FLAGS_INITIALISING)
                flags += " initing"
            console.log(flags)
        })
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
        refresh();
    }

    init();
}
/*namespace jacdac {
    class JacDacDebugger extends BridgeDriver {
        constructor() {
            super("snif")
        }

        handlePacket(pkt: Buffer): boolean {
            const packet = new JDPacket(pkt);
            let cp = new ControlPacket(packet.data);

            let s = ""
            //Convert to string to see log messages in String value
            //TODO: Maybe see data if string?
            for (let i = 0; i < packet.data.length; ++i) {
                let c = packet.data[i]
                if (!c) break
                s += String.fromCharCode(c)
            }

            console.log(`p ${packet.address} ${packet.size}b ${s}`)
            return true;
        }
    }
    const logAllDriver = new JacDacDebugger();
    logAllDriver.enable();
}
*/
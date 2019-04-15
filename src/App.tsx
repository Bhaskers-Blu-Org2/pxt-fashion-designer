// / <reference path="./localtypings/fabric.d.ts" />

import * as React from 'react';
import { pxt, PXTClient } from '../lib/pxtextensions';
import { MainCanvas } from './components/MainCanvas'

export interface AppProps {
    client: PXTClient;
    target: string;
}

export interface AppState {
}

export class App extends React.Component<AppProps, AppState> {
    _mainCanvas: MainCanvas;

    constructor(props: AppProps) {
        super(props);

        this.state = {
        }

        this.handleReadResponse = this.handleReadResponse.bind(this);
        this.handleHidden = this.handleHidden.bind(this);

        props.client.on('read', this.handleReadResponse);
        props.client.on('hidden', this.handleHidden);
    }

    handleReadResponse(resp: pxt.extensions.ReadResponse) {
        this.deserialize(resp);
    }

    handleHidden() {
        this.serialize();
    }

    private deserialize(resp: pxt.extensions.ReadResponse) {
        if (resp && resp.json && resp.json.length > 0) {
            const code = resp.code;
            const json = JSON.parse(resp.json);
            console.log('reading code and json', code, json);
        }
    }

    private serialize() {
        // PXT allows us to write to files in the project [extension_name].ts and [extension_name].json
        console.log("write code and json");

        const code = `
namespace fashion {
    //% fixedInstance whenUsed block="left foot"
    export const motion2 = new MotionBead("left foot");            
}
        `;
        const json = {
            test: "testing"
        };
        pxt.extensions.write(code, JSON.stringify(this.state));
    }


    render() {
        return (
            <div >
                <MainCanvas ref={m => this._mainCanvas = m} />
            </div>
        );
    }
}
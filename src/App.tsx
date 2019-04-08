// / <reference path="./localtypings/fabric.d.ts" />

import * as React from 'react';
import { Menu, Button } from 'semantic-ui-react'
import { pxt, PXTClient } from '../lib/pxtextensions';
import { Fabric } from './components/Fabric';
import { SidebarExampleSidebar} from './components/Sketching';
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

        const code = "// TODO";
        const json = {};
        pxt.extensions.write(code, JSON.stringify(json));
    }


    render() {

        return (
            <div >
                <MainCanvas ref={m => this._mainCanvas = m} />
            </div>
        );
    }
}
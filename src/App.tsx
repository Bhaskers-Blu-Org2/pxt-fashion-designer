// / <reference path="./localtypings/fabric.d.ts" />

import * as React from 'react';
import { Menu, Button } from 'semantic-ui-react'
import { pxt, PXTClient } from '../lib/pxtextensions';
import { Fabric } from './components/Fabric';

export interface AppProps {
    client: PXTClient;
    target: string;
}

export interface AppState {
    menu?: boolean;
}

export class App extends React.Component<AppProps, AppState> {
    fabric: Fabric;

    constructor(props: AppProps) {
        super(props);

        this.state = {
        }

        this.deserialize = this.deserialize.bind(this);
        this.serialize = this.serialize.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);

        props.client.on('read', this.deserialize);
        props.client.on('hidden', this.serialize);
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

        const { menu } = this.state;
        const code = "// TODO";
        const json = {};
        pxt.extensions.write(code, JSON.stringify(json));
    }

    private handleMenuClick() {
        const { menu } = this.state;
        this.setState({ menu: !menu });
    }

    render() {
        const { menu } = this.state;

        return (
            <div className="ui container">
                <div className="ui center">
                    <Fabric ref={f => this.fabric = f} />
                </div>
                <div className="ui menu" role="button" onClick={this.handleMenuClick}>
                    {menu ? "hello" : "olleh"}
                    {menu ? <div>some more html</div> : undefined}
                </div>
            </div>
        );
    }
}
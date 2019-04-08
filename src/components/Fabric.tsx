
import * as React from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export class Fabric extends React.Component<{}, {}> {
    element: HTMLCanvasElement;
    canvas: fabric.Canvas;

    constructor(props: {}) {
        super(props);

        this.bindFabric = this.bindFabric.bind(this);
    }

    bindFabric(el: any) {
        this.element = el;
        this.canvas = new fabric.Canvas(this.element);
        this.canvas.add(new fabric.Circle({
            radius: 10
        }))
        this.canvas.backgroundColor="green";

        var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.canvas.setWidth(200)
        this.canvas.setHeight(height)
    }

    componentDidMount() {
        // ready to do something
    }

    componentWillUnmount() {
        // detroy
    }

    render() {
        return <canvas ref={this.bindFabric} />;
    }
}
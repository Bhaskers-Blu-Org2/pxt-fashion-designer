
import * as React from 'react';

export class Fabric extends React.Component<{}, {}> {
    element: HTMLCanvasElement;
    canvas: fabric.Canvas;

    constructor(props: {}) {
        super(props);

        this.bindFabric = this.bindFabric.bind(this);
    }

    bindFabric(el: any) {
        this.element = el;
        this.canvas = new fabric.Canvas(this.element)
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
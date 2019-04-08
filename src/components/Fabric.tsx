
import * as React from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export class Fabric extends React.Component<any, any> {
    element: HTMLCanvasElement;
    canvas: fabric.Canvas;

    constructor(props: {}) {
        super(props);

        this.bindFabric = this.bindFabric.bind(this);

        this.state = {
            height: 200,
            width: 200
        };

    }

    bindFabric(el: any) {
        this.element = el;
        this.canvas = new fabric.Canvas(this.element);
        this.canvas.add(new fabric.Circle({
            radius: 10
        }))
        this.canvas.backgroundColor="green";
        this.canvas.setWidth(this.state.height)
        this.canvas.setHeight(this.state.width)

        //this.canvas.setDimensions({width: '100px', height: '100%'}, {cssOnly: true});


    }

    setHeightWidth()
    {

    }

    componentDidUpdate()
    {
        console.log("fabric: componentDidUpdate()")
    }

    componentDidMount() {
        // ready to do something
        console.log("fabric: componentDidUpdate()")
    }

    componentWillUnmount() {
        // detroy
    }

    render() {
        return <canvas ref={this.bindFabric} />;
    }
}
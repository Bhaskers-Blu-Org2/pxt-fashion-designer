
import * as React from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'


export interface FabricProps {
    circles: [number, number, number][];
}


export class Fabric extends React.Component<FabricProps, {}> {
    element: HTMLCanvasElement;
    canvas: fabric.Canvas;

    constructor(props: FabricProps) {
        super(props);

        this.bindFabric = this.bindFabric.bind(this);
    }

    componentDidUpdate() {
        this.props.circles.forEach(([x, y, radius]) => {
            this.canvas.add(new fabric.Circle({
                radius: radius
            }))
        });
    }

    bindFabric(el: Element) {
        const bbox = el.parentElement.getBoundingClientRect();
        this.element = el as HTMLCanvasElement;
        this.canvas = new fabric.Canvas(this.element);
        this.canvas.add(new fabric.Circle({
            radius: 10
        }))
        this.canvas.backgroundColor="green";

        var width = Math.min(bbox.width, window.innerWidth || 0);
        var height = Math.max(bbox.height, window.innerHeight || 0);
        this.canvas.setWidth(width)
        this.canvas.setHeight(height)
    }

    componentDidMount() {
        // ready to do something
    }

    componentWillUnmount() {
        // detroy
    }

    render() {
        return <div className="fabric-outer" style={{ width: "100%", height: "100%" }}>
            <canvas ref={this.bindFabric} />
        </div>
    }
}
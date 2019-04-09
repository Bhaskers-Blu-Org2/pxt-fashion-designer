
import * as React from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export class Fabric extends React.Component<any, any> {
    element: HTMLCanvasElement;
    canvas: fabric.Canvas;

    constructor(props: any) {
        super(props);

        this.bindFabric = this.bindFabric.bind(this);

    }

    zoomIn()
    {
        var zoom = this.canvas.getZoom();
        zoom = zoom*1.1;
        this.canvas.setZoom(zoom);
    }

    zoomOut()
    {
        var zoom = this.canvas.getZoom();
        zoom = zoom*0.9;
        this.canvas.setZoom(zoom);
    }

    bindFabric(el: any) {
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
        this.canvas.setZoom(this.canvas.getZoom()*1.1);
        this.canvas.renderAll();
    }

    componentWillUnmount() {
        // detroy
    }

    render() {
        return <canvas ref={this.bindFabric} />;
    }
}
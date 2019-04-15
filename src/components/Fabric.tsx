
import * as React from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export class Fabric extends React.Component<any, any> {
    element: HTMLCanvasElement;
    canvas: fabric.Canvas;

    constructor(props: any) {
        super(props);

        this.bindFabric = this.bindFabric.bind(this);

    }

    deleteCurrentObject()
    {
        if (this.canvas.getActiveObjects() != null)
        {
            this.canvas.getActiveObjects().forEach(element => {
                this.canvas.remove(element);
            });
        }
    }

    setDrawingMode()
    {
        this.canvas.isDrawingMode = true;
        this.canvas.selection = false;
    }

    setSelectionMode()
    {
        this.canvas.isDrawingMode = false;
        this.canvas.selection = true;
    }

    setDrawingColor(color: string)
    {
        this.canvas.setBrushColor(color);
    }

    setPencilBrush()
    {
        this.canvas.setPencilBrush(this.canvas);
    }

    setCircleBrush()
    {
        this.canvas.setCircleBrush(this.canvas);
    }

    setSprayBrush()
    {
        this.canvas.setSprayBrush(this.canvas);
    }

    clearCanvas()
    {
        this.canvas.clear().renderAll();
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
        this.canvas = new fabric.Canvas(this.element,{
            backgroundColor: 'transparent',
        });

        var width = Math.min(bbox.width, window.innerWidth || 0);
        var height = Math.max(bbox.height, window.innerHeight || 0);
        
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        //this.canvas.setBrushWidth(5);
        //this.canvas.setPencilBrush(this.canvas);
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
import * as React from 'react';
import { Fabric } from './Fabric'
import { Grid, Menu, Responsive, Button, Icon, Sidebar, Segment, Label, Header, Divider, Dimmer } from 'semantic-ui-react'
import { CirclePicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencil, faPaintBrush, faSprayCan, faEraser, faCircle, faSquare, faGripLines, faFileImage, faTrashAlt, faFileDownload, faLightbulb, faPalette, faTemperatureHot, faBrain, faArrows, faSignalAlt, faHandPaper, faTireRugged, faLightsHoliday, faVolume, faMousePointer } from '@fortawesome/pro-solid-svg-icons'
import FileDrop from 'react-file-drop'


library.add(faPencil, faPaintBrush, faSprayCan, faEraser, faCircle, faSquare, faGripLines, faFileImage, faTrashAlt, faFileDownload, faLightbulb, faPalette, faTemperatureHot, faBrain, faArrows, faSignalAlt, faHandPaper, faTireRugged, faLightsHoliday, faVolume, faMousePointer)


export enum DrawingMode {
    regular = 1,
    circle = 2,
    square = 3,
    line = 4
}

export interface MainCanvasState {
    inspirationToolBarVisible: boolean;
    beadsToolbarVisble: boolean;
    sketchingToolbarVisible: boolean;
    imageDragDropActive: boolean;
    canvasImages: [];
    inspirationImages: [];
    drawingMode: DrawingMode;
    sensors: fabric.Circle[];
}

export class MainCanvas extends React.Component<any, MainCanvasState>{


    fabric: Fabric;

    constructor(props: {}) {


        super(props);

        this.state = {
            inspirationToolBarVisible: false,
            beadsToolbarVisble: false,
            sketchingToolbarVisible: false,
            imageDragDropActive: false,
            canvasImages: [],
            inspirationImages: [],
            drawingMode: DrawingMode.regular,
            sensors: [] 
        }

        this.handleSketchingToolBarClick = this.handleSketchingToolBarClick.bind(this);
        this.handleInspirationBarClick = this.handleInspirationBarClick.bind(this);
        this.handleBeadsBarClick = this.handleBeadsBarClick.bind(this);
    }

    //#region Default React Component methods

    private handleDeleteKey = (e: KeyboardEvent) => {
        if (e.keyCode == 8) {
            this.fabric.deleteCurrentObject();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleDeleteKey);
        this.setupDrawingListeners();

    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleDeleteKey);
    }

    //#endregion

    //#region Click Handlers for Hiding/Showing Toolbars

    handleSketchingToolBarHide = () => this.setState({ sketchingToolbarVisible: false })
    handleSketchingToolBarClick() {

        const { sketchingToolbarVisible } = this.state;

        if (sketchingToolbarVisible) {
            this.setState({ sketchingToolbarVisible: false })
        }
        else {
            this.setState({ sketchingToolbarVisible: true })
        }
    }

    handleBeadsBarHide = () => this.setState({ beadsToolbarVisble: false })
    handleBeadsBarClick() {

        const { beadsToolbarVisble } = this.state;

        if (beadsToolbarVisble) {
            this.setState({ beadsToolbarVisble: false })
        }
        else {
            this.setState({ beadsToolbarVisble: true })
        }
    }

    handleInspirationBarHide = () => this.setState({ inspirationToolBarVisible: false })
    handleInspirationBarClick() {

        const { inspirationToolBarVisible } = this.state;

        if (inspirationToolBarVisible) {
            this.setState({ inspirationToolBarVisible: false })
        }
        else {
            this.setState({ inspirationToolBarVisible: true })
        }
    }

    //#endregion

    //#region Handlers for FabricJS functionality related to toolbars

    protected handleZoomInClick = () => { this.fabric.zoomIn() };

    protected handleZoomOutClick = () => { this.fabric.zoomOut() };

    protected handleSetDrawingMode() {
        this.fabric.setDrawingMode();
        this.setState({ drawingMode: DrawingMode.regular });
    }

    handleSetPencilDrawingMode() {
        this.fabric.setDrawingMode();
        this.fabric.setPencilBrush();
        this.setState({ drawingMode: DrawingMode.regular });
    }

    handleSetCircleBrushDrawingMode() {
        this.fabric.setDrawingMode();
        this.fabric.setCircleBrush();
        this.setState({ drawingMode: DrawingMode.regular });
    }

    handleSetSprayBrushDrawingMode() {
        this.fabric.setDrawingMode();
        this.fabric.setSprayBrush();
        this.setState({ drawingMode: DrawingMode.regular });
    }

    handleDownloadSketch() {
        this.setState({ drawingMode: DrawingMode.regular });
        let sketch_link = document.createElement("a");
        var svgdata = this.fabric.canvas.toDataURL({ format: 'png' });
        sketch_link.href = svgdata;
        sketch_link.download = "sketch.png";
        sketch_link.click();
    }

    handleClearSketchCanvas() {
        this.fabric.clearCanvas();
        this.setState({ drawingMode: DrawingMode.regular });
    }

    handleImageAddToCanvas() {
        // let url = "";
        // fabric.Image.fromURL(url,(img)=> {});

        // fabric.Image.fromURL(url, (oImg) => {
        //     this.fabric.canvas.add(oImg);
        // });
        this.setState({ imageDragDropActive: true });
    }

    handleSetSelectionMode() {
        this.setState({ drawingMode: DrawingMode.regular });
        this.fabric.setSelectionMode();
    }

    handleChangeComplete = (data: any) => {
        this.fabric.setDrawingColor(data.hex);
        console.log(data.hex);

    };

    isDown: boolean;
    circle: fabric.Circle;
    rectang: fabric.Rect;
    line: fabric.Line;
    originX: number;
    originY: number;

    onMouseDown = (event: any) => {
        this.isDown = true;

        if (this.state.drawingMode == DrawingMode.circle)
        {
            this.fabric.canvas.selection = false;

            var p = this.fabric.canvas.getPointer(event);
            this.originX = Math.abs(p.x);
            this.originY = Math.abs(p.y);
    
            this.circle = new fabric.Circle({
                left: this.originX,
                top: this.originY,
                radius: 1,
                strokeWidth: 1,
                stroke: 'black',
                fill: 'black',
                selectable: true,
                originX: 'center', originY: 'center'
            });
            this.fabric.canvas.add(this.circle);
        }
        else if (this.state.drawingMode == DrawingMode.square)
        {
            this.fabric.canvas.selection = false;

            var p = this.fabric.canvas.getPointer(event);
            this.originX = Math.abs(p.x);
            this.originY = Math.abs(p.y);

            this.rectang = new fabric.Rect({
                left: this.originX,
                top: this.originY,
                originX: 'left',
                originY: 'top',
                width: p.x - this.originX,
                height: p.y - this.originY,
                stroke: 'FF0000',
                strokeWidth: 1,
                fill: 'black',
                transparentCorners: false,
                selectable: true,
                angle: 0
              });
            this.fabric.canvas.add(this.rectang);
        }
        else if (this.state.drawingMode == DrawingMode.line)
        {
            this.fabric.canvas.selection = false;

            var p = this.fabric.canvas.getPointer(event);
            this.originX = Math.abs(p.x);
            this.originY = Math.abs(p.y);

            var points = [this.originX, this.originY, this.originX, this.originY];

            this.line = new fabric.Line(points,{
                strokeWidth: 1,
                fill: 'black',
                stroke: 'black',
                originX: 'center',
                originY: 'center',
                selectable: true
            });
            this.fabric.canvas.add(this.line);
        }
    }

    onMouseMove = (event: any) => {
        if (!this.isDown)
            return;           
        
        if (this.state.drawingMode == DrawingMode.circle)
        {
            var p = this.fabric.canvas.getPointer(event);
            this.circle.set({ radius: Math.abs  (this.originX - Math.abs(p.x)) });
            this.fabric.canvas.renderAll();
        }
        else if (this.state.drawingMode == DrawingMode.square)
        {
            var p = this.fabric.canvas.getPointer(event);

            if (this.originX > p.x) {
                this.rectang.set({ left: Math.abs(p.x) });
            }
            if (this.originX > p.y) {
                this.rectang.set({ top: Math.abs(p.y) });
            }
            this.rectang.set({ width: Math.abs(this.originX - p.x) });
            this.rectang.set({ height: Math.abs(this.originY - p.y) });
            this.fabric.canvas.renderAll();
        }
        else if (this.state.drawingMode == DrawingMode.line)
        {
            var p = this.fabric.canvas.getPointer(event);
            this.line.set({ x2: p.x, y2: p.y });
            this.fabric.canvas.renderAll();
        }
    }

    onMouseUp = (event: any) => {
        this.isDown = false;

        if (this.state.drawingMode == DrawingMode.circle)
        {
            this.circle.setCoords();
            this.setState({ drawingMode: DrawingMode.regular });

        }
        else if (this.state.drawingMode == DrawingMode.square)
        {
            this.rectang.setCoords();
            this.setState({ drawingMode: DrawingMode.regular });
        }
        else if (this.state.drawingMode == DrawingMode.line)
        {
            this.line.setCoords();
            this.setState({ drawingMode: DrawingMode.regular });
        }
        else
            this.setState({ drawingMode: DrawingMode.regular });

    }

    setupDrawingListeners() {
        this.fabric.canvas.on('mouse:down', this.onMouseDown);
        this.fabric.canvas.on('mouse:move', this.onMouseMove);
        this.fabric.canvas.on('mouse:up', this.onMouseUp);
    }

    handleMove(e: MouseEvent) {
        console.log("Div Element X: " + e.clientX + " Div Element Y: " + e.clientY);
    }

    handleHide = () => this.setState({ imageDragDropActive: false })

    //TODO: Handle multiple files?
    handleDrop = (files: FileList, event: any) => {

        var url = URL.createObjectURL(files[0]);

        let canvas = this.fabric.canvas;
        fabric.Image.fromURL(url, function (oImg) {
            var l = Math.random() * (500 - 0) + 0;
            var t = Math.random() * (500 - 0) + 0;
            oImg.scale(0.2);
            oImg.set({ 'left': l });
            oImg.set({ 'top': t });
            canvas.add(oImg);
        });
    }

    handleSetDrawCircle()
    {
        this.setState({ drawingMode: DrawingMode.circle });
        this.fabric.canvas.isDrawingMode = false;
        this.fabric.canvas.selection = true;
    }

    handleSetDrawSquare()
    {
        this.setState({ drawingMode: DrawingMode.square });
        this.fabric.canvas.isDrawingMode = false;
    }

    handleSetDrawLine()
    {
        this.setState({ drawingMode: DrawingMode.line });
        this.fabric.canvas.isDrawingMode = false;
    }

    //#endregion

    //#region Adding Sensors

    addSensorCircle(name: string, color: string)
    {
        var sensorCircle = new fabric.Circle({
            left: 50,
            top: 50,
            radius: 20,
            strokeWidth: 2,
            stroke: 'black',
            fill: color,
            name: name,
            selectable: true,
            originX: 'center', originY: 'center'
        });
        this.fabric.canvas.add(sensorCircle);
        this.fabric.canvas.bringToFront(sensorCircle);
    
        var newStateArray = this.state.sensors.slice();
        newStateArray.push(sensorCircle);
        this.setState({sensors: newStateArray});
    }


    addTattoo()
    {
        this.addSensorCircle('TATTOO','#9b59b6')
    }

    addAccelerometer()
    {
        this.addSensorCircle('ACCEL','#2ecc71')
    }

    addProximitySensor()
    {
        this.addSensorCircle('PROX','#3498db')
    }

    addEnvironmentSensor()
    {
        this.addSensorCircle('ENVIRO','#f1c40f')
    }

    addLightSensor()
    {
        this.addSensorCircle('LIGHT','#e74c3c')
    }

    addColorSensor()
    {
        this.addSensorCircle('COLOR','#ffffff')        
    }

    addLightOutput()
    {
        this.addSensorCircle('LIGHTOUT','#ecf0f1')        
    }

    addTattooOutput()
    {
        this.addSensorCircle('TATTOOOUT','#9b59b6')        
    }

    addMotorOutPut()
    {
        this.addSensorCircle('MOTOROUT','#2c3e50')        
    }

    addSoundOutput()
    {
        this.addSensorCircle('SOUNDOUT','#e84393')        
    }

    //#endregion

    render() {
        const { sketchingToolbarVisible } = this.state;
        const { beadsToolbarVisble } = this.state;
        const { inspirationToolBarVisible } = this.state;
        const { imageDragDropActive } = this.state;

        return (

            <div>
                <Dimmer.Dimmable as={Segment} dimmed={imageDragDropActive}>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar
                            as={Segment}
                            animation='push'
                            direction='bottom'
                            horizontal
                            visible={sketchingToolbarVisible}
                            onHide={this.handleSketchingToolBarHide}
                            width='very thin'
                            color="black">
                            <Grid >
                                <Grid.Row centered horizontalAlign="middle" color="black">
                                    <CirclePicker width={'100hw'} onChangeComplete={this.handleChangeComplete} />
                                </Grid.Row>
                                <Grid.Row style={{ height: '90%' }} centered verticalAlign="middle" horizontalAlign="middle" color="black">
                                    <Grid.Column width={1} >
                                        <Button icon size='medium' onClick={this.handleSetPencilDrawingMode.bind(this)} color="black" className="cool">
                                            <FontAwesomeIcon icon="pencil" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} >
                                        <Button icon size='medium' onClick={this.handleSetCircleBrushDrawingMode.bind(this)} color="black">
                                            <FontAwesomeIcon icon="paint-brush" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} id="FabricCanvas" aligned left verticalAlign="middle" >
                                        <Button icon size='medium' onClick={this.handleSetSprayBrushDrawingMode.bind(this)} color="black">
                                            <FontAwesomeIcon icon="spray-can" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='medium' onClick={this.handleSetDrawCircle.bind(this)} color="black">
                                            <FontAwesomeIcon icon="circle" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='medium' onClick={this.handleSetDrawSquare.bind(this)} color="black">
                                            <FontAwesomeIcon icon="square" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='medium' onClick={this.handleSetDrawLine.bind(this)} color="black">
                                            <FontAwesomeIcon icon="grip-lines" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} >
                                        <Button icon size='medium' onClick={this.handleSetSelectionMode.bind(this)} color="black" className="cool">
                                            <FontAwesomeIcon icon="mouse-pointer" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                            <FontAwesomeIcon icon="eraser" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='medium' onClick={this.handleClearSketchCanvas.bind(this)} color="black">
                                            <FontAwesomeIcon icon="trash-alt" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='medium' onClick={this.handleImageAddToCanvas.bind(this)} color="black">
                                            <FontAwesomeIcon icon="file-image" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='medium' onClick={this.handleDownloadSketch.bind(this)} color="black">
                                            <FontAwesomeIcon icon="file-download" size="3x" />
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Sidebar>
                        <Sidebar
                            as={Segment}
                            animation='push'
                            direction='right'
                            inverted
                            vertical
                            visible={beadsToolbarVisble}
                            onHide={this.handleBeadsBarHide}
                            width='thin'
                            color="black">
                            <Grid>
                                <Grid.Column centered verticalAlign="middle" color="black" >
                                    <Grid.Row height={1} >
                                        <Divider />
                                        <Header as="h3" textAlign="center" color="blue">Input</Header>
                                        <Divider />
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addEnvironmentSensor.bind(this)} color="black">
                                            <FontAwesomeIcon icon="temperature-hot" size="3x" color="#f1c40f" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addProximitySensor.bind(this)} color="black">
                                            <FontAwesomeIcon icon="signal-alt" size="3x" color="#3498db" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addLightSensor.bind(this)} color="black">
                                            <FontAwesomeIcon icon="lightbulb" size="3x" color="#e74c3c" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addAccelerometer.bind(this)} color="black">
                                            <FontAwesomeIcon icon="arrows" size="3x" color="#2ecc71" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addTattoo.bind(this)} color="black">
                                            <FontAwesomeIcon icon="hand-paper" size="3x" color="#9b59b6" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addColorSensor.bind(this)} color="black">
                                            <FontAwesomeIcon icon="palette" size="3x" color="#ffffff" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Divider />
                                        <Header as="h3" textAlign="center" color="blue">Output</Header>
                                        <Divider />
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addMotorOutPut.bind(this)} color="black">
                                            <FontAwesomeIcon icon="tire-rugged" size="3x" color="#2c3e50" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addLightOutput.bind(this)} color="black">
                                            <FontAwesomeIcon icon="lights-holiday" size="3x" color="#ecf0f1" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addSoundOutput.bind(this)} color="black">
                                            <FontAwesomeIcon icon="volume" size="3x" color="#e84393" />
                                        </Button>
                                    </Grid.Row>
                                    <Grid.Row height={1} >
                                        <Button icon size='medium' onClick={this.addTattooOutput.bind(this)} color="black">
                                            <FontAwesomeIcon icon="hand-paper" size="3x" color="#9b59b6" />
                                        </Button>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Sidebar>
                        <Sidebar
                            as={Segment}
                            animation='push'
                            direction='top'
                            inverted
                            horizontal
                            visible={inspirationToolBarVisible}
                            onHide={this.handleInspirationBarHide}
                            width='wide'
                            color="black">


                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment basic>
                                <Grid style={{ height: '100vh', width: '100vw' }}>
                                    <Grid.Row style={{ height: '5%' }} centered horizontalAlign="middle">
                                        <Menu.Item>
                                            <Button icon size='large' onClick={this.handleInspirationBarClick.bind(this)}>
                                                <Icon name='pin' />
                                            </Button>
                                        </Menu.Item>
                                    </Grid.Row>
                                    <Grid.Row style={{ height: '90%' }} centered verticalAlign="middle" horizontalAlign="middle">
                                        <Grid.Column width={1} background="red">
                                            <Button icon size='large' onClick={this.handleZoomInClick.bind(this)}>
                                                <Icon name='zoom-in' />
                                            </Button>
                                            <Button icon size='large' onClick={this.handleZoomOutClick.bind(this)}>
                                                <Icon name='zoom-out' />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={14} id="FabricCanvas" aligned left verticalAlign="middle" >
                                            <Fabric ref={f => this.fabric = f}/>
                                        </Grid.Column>
                                        <Grid.Column width={1} aligned middle onClick={this.handleBeadsBarClick.bind(this)} background="blue">
                                            <Button icon size='large'>
                                                <Icon name='radio' />
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row style={{ height: '5%' }} centered verticalAlign="middle">
                                        <Button icon size='large' onClick={this.handleSketchingToolBarClick.bind(this)}>
                                            <Icon name='pencil' />
                                        </Button>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                    <Dimmer active={imageDragDropActive} onClickOutside={this.handleHide}>
                        <FileDrop onDrop={this.handleDrop}>
                            Drop your image or sketch here
                        </FileDrop>
                    </Dimmer>
                </Dimmer.Dimmable>
            </div>

        );
    }
}
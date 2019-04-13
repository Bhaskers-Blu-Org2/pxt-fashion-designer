import * as React from 'react';
import { Fabric } from './Fabric'
import { Grid, Menu, Responsive, Button, Icon, Sidebar, Segment, Label, Header, Divider, Dimmer} from 'semantic-ui-react'
import { CirclePicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencil, faPaintBrush, faSprayCan, faEraser, faCircle, faSquare, faGripLines, faFileImage, faTrashAlt, faFileDownload, faLightbulb,  faPalette, faTemperatureHot, faBrain, faArrows, faSignalAlt, faHandPaper, faTireRugged, faLightsHoliday, faVolume, faMousePointer} from '@fortawesome/pro-solid-svg-icons'

library.add(faPencil,faPaintBrush,faSprayCan, faEraser, faCircle, faSquare, faGripLines, faFileImage, faTrashAlt, faFileDownload, faLightbulb, faPalette, faTemperatureHot, faBrain, faArrows, faSignalAlt, faHandPaper, faTireRugged, faLightsHoliday, faVolume, faMousePointer)



export interface MainCanvasState {
    inspirationToolBarVisible: boolean;
    beadsToolbarVisble: boolean;
    sketchingToolbarVisible: boolean;
    imageDragDropActive: boolean;
}

export class MainCanvas extends React.Component<any,MainCanvasState>{

    
    fabric: Fabric;


    constructor(props: {}) {

        
        super(props);

        this.state = {
            inspirationToolBarVisible: false,
            beadsToolbarVisble: false,
            sketchingToolbarVisible: false,
            imageDragDropActive: false
        }
    
        this.handleSketchingToolBarClick = this.handleSketchingToolBarClick.bind(this);
        this.handleInspirationBarClick = this.handleInspirationBarClick.bind(this);
        this.handleBeadsBarClick = this.handleBeadsBarClick.bind(this);
    }

    //#region Default React Component methods

    componentDidMount() {
    }

    //#endregion

    //#region Click Handlers for Hiding/Showing Toolbars

    handleSketchingToolBarHide = () => this.setState({sketchingToolbarVisible: false})
    handleSketchingToolBarClick() {

        const {sketchingToolbarVisible} = this.state;

        if (sketchingToolbarVisible)
        {
            this.setState({ sketchingToolbarVisible: false})
        }
        else
        {
            this.setState({ sketchingToolbarVisible: true })
        }
    }

    handleBeadsBarHide = () => this.setState({beadsToolbarVisble: false})
    handleBeadsBarClick() {

        const {beadsToolbarVisble} = this.state;

        if (beadsToolbarVisble)
        {
            this.setState({ beadsToolbarVisble: false})
        }
        else
        {
            this.setState({ beadsToolbarVisble: true })
        }
    }

    handleInspirationBarHide = () => this.setState({inspirationToolBarVisible: false})
    handleInspirationBarClick() {

        const {inspirationToolBarVisible} = this.state;

        if (inspirationToolBarVisible)
        {
            this.setState({ inspirationToolBarVisible: false})
        }
        else
        {
            this.setState({ inspirationToolBarVisible: true })
        }
    }

    //#endregion

    //#region Handlers for FabricJS functionality related to toolbars

    protected handleZoomInClick = () => { this.fabric.zoomIn() };

    protected handleZoomOutClick = () => { this.fabric.zoomOut() };

    protected handleSetDrawingMode()
    {
        debugger;
        this.fabric.setDrawingMode();
    }

    handleSetPencilDrawingMode()
    {
        this.fabric.setDrawingMode();
        this.fabric.setPencilBrush();
    }

    handleSetCircleBrushDrawingMode()
    {
        this.fabric.setDrawingMode();
        this.fabric.setCircleBrush();
    }

    handleSetSprayBrushDrawingMode()
    {
        this.fabric.setDrawingMode();
        this.fabric.setSprayBrush();
    }

    handleDownloadSketch()
    {
        let sketch_link = document.createElement("a");
        var svgdata = this.fabric.canvas.toSVG()
        var locfile = new Blob([svgdata], {type: "image/svg+xml;charset=utf-8"});
        sketch_link.href = URL.createObjectURL(locfile);
        sketch_link.download = "sketch.svg";
        sketch_link.click();
    }

    handleImageAddToCanvas()
    {
        // let url = "";
        // fabric.Image.fromURL(url,(img)=> {});

        // fabric.Image.fromURL(url, (oImg) => {
        //     this.fabric.canvas.add(oImg);
        // });
        this.setState({ imageDragDropActive: true });
    }

    //#endregion

    handleChangeComplete = (data: any) => {
        this.fabric.setDrawingColor(data.hex);
        console.log(data.hex);
    };

    handleHide = () => this.setState({ imageDragDropActive: false })

    render() {
        const {sketchingToolbarVisible} = this.state;
        const {beadsToolbarVisble} = this.state;
        const {inspirationToolBarVisible} = this.state;
        const {imageDragDropActive} = this.state

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
                                        <CirclePicker width={'100hw'} onChangeComplete={ this.handleChangeComplete }/>
                                    </Grid.Row>
                                    <Grid.Row style={{ height: '90%' }} centered verticalAlign="middle" horizontalAlign="middle" color="black">
                                        <Grid.Column width={1} >
                                            <Button icon size='medium' onClick={this.handleSetPencilDrawingMode.bind(this)} color="black" className="cool">
                                                <FontAwesomeIcon icon="pencil" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} >
                                            <Button icon size='medium' onClick={this.handleSetCircleBrushDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="paint-brush" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} id="FabricCanvas" aligned left verticalAlign="middle" >
                                            <Button icon size='medium' onClick={this.handleSetSprayBrushDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="spray-can" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} aligned middle>
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="circle" size="3x"  />
                                            </Button>
                                        </Grid.Column>                                    
                                        <Grid.Column width={1} aligned middle>
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="square" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} aligned middle>
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="grip-lines" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} >
                                            <Button icon size='medium' onClick={this.handleSetPencilDrawingMode.bind(this)} color="black" className="cool">
                                                <FontAwesomeIcon icon="mouse-pointer" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} aligned middle>
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="eraser" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} aligned middle>
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="trash-alt" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} aligned middle>
                                            <Button icon size='medium' onClick={this.handleImageAddToCanvas.bind(this)} color="black">
                                                <FontAwesomeIcon icon="file-image" size="3x"  />
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column width={1} aligned middle>
                                            <Button icon size='medium' onClick={this.handleDownloadSketch.bind(this)} color="black">
                                                <FontAwesomeIcon icon="file-download" size="3x"  />
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
                                    <Grid.Column  centered verticalAlign="middle" color="black" >
                                        <Grid.Row height={1} >
                                            <Divider />
                                            <Header as="h3" textAlign="center" color="blue">Input</Header>
                                            <Divider />
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="temperature-hot" size="3x" color="#f1c40f" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="signal-alt" size="3x" color="#3498db" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="lightbulb" size="3x" color="#e74c3c" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="arrows" size="3x" color="#2ecc71" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="hand-paper" size="3x" color="#9b59b6" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="palette" size="3x" color="#ffffff" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Divider />
                                            <Header as="h3" textAlign="center" color="blue">Output</Header>
                                            <Divider />
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="tire-rugged" size="3x" color="#2c3e50" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="lights-holiday" size="3x" color="#ecf0f1" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                                <FontAwesomeIcon icon="volume" size="3x" color="#e84393" />
                                            </Button>
                                        </Grid.Row>
                                        <Grid.Row height={1} >
                                            <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
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
                                    <Grid.Column width={1} >
                                        <Button icon size='large' onClick={this.handleZoomInClick.bind(this)}>
                                            <Icon name='zoom-in' />
                                        </Button>
                                        <Button icon size='large' onClick={this.handleZoomOutClick.bind(this)}>
                                            <Icon name='zoom-out' />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={14} id="FabricCanvas" aligned left verticalAlign="middle">
                                        <Fabric ref={f => this.fabric = f} />
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle onClick={this.handleBeadsBarClick.bind(this)}>
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
                    <Dimmer active={imageDragDropActive}  onClickOutside={this.handleHide}>
                    <Header as='h2' icon inverted>
                        <Icon name='image' />
                            Drag your image or sketch here
                    </Header>
                </Dimmer>
                </Dimmer.Dimmable> 
            </div>

        );
    }
}
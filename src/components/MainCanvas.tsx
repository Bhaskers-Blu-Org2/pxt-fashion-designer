import * as React from 'react';
import { Fabric } from './Fabric'
import { Grid, Menu, Responsive, Button, Icon, Sidebar, Segment } from 'semantic-ui-react'
import { CirclePicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencil, faPaintBrush, faSprayCan, faEraser, faCircle, faSquare, faGripLines, faFileImage, faTrashAlt, faFileDownload} from '@fortawesome/pro-solid-svg-icons'

library.add(faPencil,faPaintBrush,faSprayCan, faEraser, faCircle, faSquare, faGripLines, faFileImage, faTrashAlt, faFileDownload )



export interface MainCanvasState {
    inspirationToolBarVisible: boolean;
    beadsToolbarVisble: boolean;
    sketchingToolbarVisible: boolean;
}

export class MainCanvas extends React.Component<any,MainCanvasState>{

    
    fabric: Fabric;


    constructor(props: {}) {

        
        super(props);

        this.state = {
            inspirationToolBarVisible: false,
            beadsToolbarVisble: false,
            sketchingToolbarVisible: false
        }
    
        this.handleInspirationBarClick = this.handleInspirationBarClick.bind(this);
        const {inspirationToolBarVisible} = this.state;

    }

    private handleOnUpdate() {
    }

    componentDidMount() {
    }


    protected handleZoomInClick = () => { this.fabric.zoomIn() };

    protected handleZoomOutClick = () => { this.fabric.zoomOut() };


    handleInspirationBarHide = () => this.setState({inspirationToolBarVisible: false})
    handleInspirationBarClick() {

        const {inspirationToolBarVisible} = this.state;

        debugger;

        if (inspirationToolBarVisible)
        {
            this.setState({ inspirationToolBarVisible: false})
        }
        else
        {
            this.setState({ inspirationToolBarVisible: true })
        }
    }

    handleSetDrawingMode()
    {
        this.fabric.setDrawingMode();
    }

    handleChangeComplete = () => {
        
    };

    render() {
        const {inspirationToolBarVisible} = this.state;
        return (
            <div>                
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Segment}
                        animation='overlay'
                        icon='labeled'
                        direction='bottom'
                        inverted
                        horizontal
                        visible={inspirationToolBarVisible}
                        onHide={this.handleInspirationBarHide}
                        width='very thin'
                        color="black">
                            <Grid style={{ width: '100vw' }}>
                                <Grid.Row centered horizontalAlign="middle" color="black">
                                    <CirclePicker width={'100hw'} onChangeComplete={ this.handleChangeComplete }/>
                                </Grid.Row>
                                <Grid.Row style={{ height: '90%' }} centered verticalAlign="middle" horizontalAlign="middle" color="black">
                                    <Grid.Column width={1} >
                                        <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                            <FontAwesomeIcon icon="pencil" size="3x"  />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} >
                                        <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                            <FontAwesomeIcon icon="paint-brush" size="3x"  />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} id="FabricCanvas" aligned left verticalAlign="middle" >
                                        <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
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
                                        <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                            <FontAwesomeIcon icon="file-image" size="3x"  />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)} color="black">
                                            <FontAwesomeIcon icon="file-download" size="3x"  />
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>                        
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic>
                            <Grid style={{ height: '100vh', width: '100vw' }}>
                                <Grid.Row style={{ height: '5%' }} centered horizontalAlign="middle">
                                    <Menu.Item> 
                                        <Button icon size='large' >
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
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='large'>
                                            <Icon name='radio' />
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ height: '5%' }} centered verticalAlign="middle">
                                    <Button icon size='large' onClick={this.handleInspirationBarClick.bind(this)}>
                                        <Icon name='pencil' />
                                    </Button>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>

        );
    }
}
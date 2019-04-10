import * as React from 'react';
import { Fabric } from './Fabric'
import { Grid, Menu, Responsive, Button, Icon, Sidebar, Segment } from 'semantic-ui-react'
import { CirclePicker } from 'react-color';


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

    handleSetDrawingColor= () => {

        
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
                        width='very thin'
                        color="black">
                            <Grid style={{ width: '100vw' }}>
                                <Grid.Row centered horizontalAlign="middle" color="black">
                                    <Menu.Item> 
                                        <Button icon size='large' >
                                            <Icon name='lightbulb' />
                                        </Button>
                                    </Menu.Item>
                                    <CirclePicker width={'100hw'} onChangeComplete={ this.handleSetDrawingColor }/>
                                </Grid.Row>
                                <Grid.Row style={{ height: '90%' }} centered verticalAlign="middle" horizontalAlign="middle" color="black">
                                    <Grid.Column width={1} >
                                        <Button icon size='medium' onClick={this.handleSetDrawingMode.bind(this)}>
                                            <Icon name='pencil' />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} id="FabricCanvas" aligned left verticalAlign="middle" >
                                        <Button icon size='large' >
                                            <Icon name='paint brush' />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='large' >
                                            <Icon name='eraser' />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='large' >
                                            <Icon name='trash alternate' />
                                        </Button>
                                    </Grid.Column>                                    
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='large' >
                                            <Icon name='save' />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='large' >
                                            <Icon name='theme' />
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={1} aligned middle>
                                        <Button icon size='large'>
                                            <Icon name='add circle' />
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
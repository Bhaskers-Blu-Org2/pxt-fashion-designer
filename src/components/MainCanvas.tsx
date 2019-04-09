import * as React from 'react';
import { Fabric } from './Fabric'
import { Grid, Menu, Responsive, Button, Icon } from 'semantic-ui-react'

export class MainCanvas extends React.Component {

    fabric: Fabric;

    constructor(props: {}) {
        super(props);
    }

    private handleOnUpdate() {
    }

    componentDidMount() {
    }


    protected handleZoomInClick = (ev: any) => {
        this.fabric.zoomIn();
    };

    protected handleZoomOutClick = (ev: any) => {
        this.fabric.zoomOut();
    };

    render() {

        return (
            <Responsive as={Grid} onUpdate={this.handleOnUpdate}>
                <Grid style={{ height: '100vh', width: '100vw' }}>
                    <Grid.Row style={{ height: '5%' }} centered horizontalAlign="middle">
                        <Menu.Item>
                            <Button icon size='large'>
                                <Icon name='lightbulb' />
                            </Button>
                        </Menu.Item>
                    </Grid.Row>
                    <Grid.Row style={{ height: '90%' }} centered verticalAlign="middle" horizontalAlign = "middle">
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
                             <Button icon size='large'>
                                <Icon name='pencil' />
                            </Button>     
                    </Grid.Row>
                </Grid>
            </Responsive>

        );
    }
}
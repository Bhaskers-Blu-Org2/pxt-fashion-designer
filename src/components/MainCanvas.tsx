import * as React from 'react';
import { Fabric } from './Fabric'
import { Grid, Menu, Responsive } from 'semantic-ui-react'

export class MainCanvas extends React.Component {

    fabric: Fabric;
    
    constructor(props: {}) {
        super(props);
    }

    private handleOnUpdate() {
        debugger;
        console.log("size changed, resize fabric");
    }

    componentDidMount() {
        debugger;
        console.log(this);
        //this.fabric.setState({height = 200, width= 200});
    }


    render() {

        return (
            <Responsive as={Grid} onUpdate={this.handleOnUpdate}>
                <Grid style={{ height: '100vh', width: '100vw' }}>
                    <Grid.Row style={{ height: '5%' }} centered color="yellow">
                        Ins
                    </Grid.Row>
                    <Grid.Row style={{ height: '90%' }} centered>
                        <Grid.Column width={1} color="green" centered>
                            <Menu fluid vertical>
                                <Menu.Item className='header'>ZC</Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={14} id="FabricCanvas" color="red">
                            <Fabric ref={f => this.fabric = f} />
                        </Grid.Column>
                        <Grid.Column width={1} color="orange" centered>
                            <Menu fluid vertical>
                                <Menu.Item className='header'>TT</Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ height: '5%' }} centered color="blue">
                        Sk
                    </Grid.Row>
                </Grid>
            </Responsive>

        );
    }
}
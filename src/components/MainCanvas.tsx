import * as React from 'react';
import { Fabric } from './Fabric'
import { Grid, Menu, Responsive, Button } from 'semantic-ui-react'

export class MainCanvas extends React.Component {

    fabric: Fabric;
    circles: [number, number, number][] = [];

    private handleOnUpdate() {
        console.log("size changed, resize fabric");
    }

    componentDidMount() {
        //debugger;
        console.log(this);
    }

    protected handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        this.circles.push([
            10,
            20,
            20
        ]);

        this.forceUpdate();
    };


    render() {
        return (
            <Responsive as={Grid} onUpdate={this.handleOnUpdate}>
                <Grid celled style={{ height: '100%' }}>
                    <Grid.Row style={{ height: '5%' }} centered>
                        <Menu fluid vertical>
                            <Menu.Item className='header'>Ins</Menu.Item>
                            <Menu.Item>
                                <Button Primary onClick={this.handleClick}>
                                    Make Circle
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Grid.Row>
                    <Grid.Row style={{ height: '90%' }} centered>
                        <Grid.Column width={1}>
                            <Menu fluid vertical>
                                <Menu.Item className='header'>ZC</Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={12} id="FabricCanvas">
                            <Fabric ref={f => this.fabric = f} circles={this.circles} />
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Menu fluid vertical>
                                <Menu.Item className='header'>TT</Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ height: '5%' }} centered>
                        <Menu fluid vertical>
                            <Menu.Item className='header'>Sk</Menu.Item>
                        </Menu>
                    </Grid.Row>
                </Grid>
            </Responsive>

        );
    }
}
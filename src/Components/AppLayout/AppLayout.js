import React, {Component} from 'react';
import {Drawer, MenuItem} from 'material-ui';
import LightBulbOutlineIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import AppToolBar from "../../Components/AppToolBar/AppToolBar";

class AppLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <div>
                <AppToolBar history={this.props.history} toggleDrawer={this.toggleDrawer}/>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MenuItem leftIcon={<LightBulbOutlineIcon/>}>Notes</MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default AppLayout
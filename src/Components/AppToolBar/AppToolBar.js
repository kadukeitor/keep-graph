import React, {Component} from 'react';
import {AppBar, IconButton} from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AppToolBarMenu from "../AppToolBarMenu/AppToolBarMenu";

class AppToolBar extends Component {

    render() {
        return (
            <AppBar title="Keep Graph" style={{position: 'fixed', top: 0}}
                    iconElementLeft={<IconButton onClick={this.props.toggleDrawer}><MenuIcon/></IconButton>}
                    iconElementRight={<AppToolBarMenu history={this.props.history}/>}
            />
        )
    }
}

export default AppToolBar
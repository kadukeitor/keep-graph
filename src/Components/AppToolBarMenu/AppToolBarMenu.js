import React, {Component} from 'react'
import {IconMenu, IconButton, MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import UserService from "../../Services/User";

class AppToolBarMenu extends Component {

    render() {
        return (
            <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem primaryText="Sign Out" onClick={() => {
                    UserService.removeToken();
                    window.location = "/signIn";
                }}/>
            </IconMenu>
        );
    }

}

export default AppToolBarMenu
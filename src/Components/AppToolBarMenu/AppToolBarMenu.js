import React, {Component} from 'react'
import {IconMenu, IconButton, MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import UserService from "../../Services/User";

class AppToolBarMenu extends Component {

    render() {

        const user = UserService.getUser();

        return (
            <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem primaryText={user.authData.email}/>
                <MenuItem primaryText="Sign Out" onClick={() => {
                    UserService.removeToken();
                    this.props.history.replace("/signIn");
                    window.location.reload();
                }}/>
            </IconMenu>
        );
    }

}

export default AppToolBarMenu
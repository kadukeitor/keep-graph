import React, {Component} from 'react';
import {IconMenu, IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NoteMenuDelete from "../NoteMenuDelete/NoteMenuDelete";

class NoteMenu extends Component {

    render() {
        return (
            <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <NoteMenuDelete note={this.props.note}/>
            </IconMenu>
        );
    }

}

export default NoteMenu
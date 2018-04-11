import React, {Component} from 'react';
import {IconMenu, IconButton} from 'material-ui';
import PaletteIcon from 'material-ui/svg-icons/image/palette';
import NotesService from "../../Services/Notes";
import {graphql} from "react-apollo/index";

class NoteColor extends Component {

    constructor(props) {
        super(props);
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor(color) {
        // Callback
        if (this.props.onChange) {
            this.props.onChange(color);
        }
        // Existing Note
        if (this.props.note.id) {
            this.props.mutate({
                variables: {
                    id: this.props.note.id,
                    color: color
                },
                optimisticResponse: {
                    updateNote: {
                        id: this.props.note.id,
                        title: this.props.note.title,
                        content: this.props.note.content,
                        color: color,
                        updatedAt: new Date().toISOString(),
                        __typename: 'Note',
                    },
                }
            });
        }
    }

    render() {
        return (
            <IconMenu iconButtonElement={<IconButton><PaletteIcon/></IconButton>}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <div style={{textAlign: 'center'}}>
                    <IconButton onClick={() => this.changeColor('white')} className='color-selector white'/>
                    <IconButton onClick={() => this.changeColor('red')} className='color-selector red'/>
                    <IconButton onClick={() => this.changeColor('orange')} className='color-selector orange'/>
                    <IconButton onClick={() => this.changeColor('yellow')} className='color-selector yellow'/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <IconButton onClick={() => this.changeColor('green')} className='color-selector green'/>
                    <IconButton onClick={() => this.changeColor('teal')} className='color-selector teal'/>
                    <IconButton onClick={() => this.changeColor('blue')} className='color-selector blue'/>
                    <IconButton onClick={() => this.changeColor('dark-blue')} className='color-selector dark-blue'/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <IconButton onClick={() => this.changeColor('purple')} className='color-selector purple'/>
                    <IconButton onClick={() => this.changeColor('pink')} className='color-selector pink'/>
                    <IconButton onClick={() => this.changeColor('brown')} className='color-selector brown'/>
                    <IconButton onClick={() => this.changeColor('gray')} className='color-selector gray'/>
                </div>
            </IconMenu>
        );
    }

}

export default graphql(NotesService.mutations.updateNote)(NoteColor)
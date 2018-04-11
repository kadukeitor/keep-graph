import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import NoteColor from "../NoteColor/NoteColor";
import NotesService from "../../Services/Notes";
import {graphql} from "react-apollo/index";

class NoteEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.note.title || '',
            content: props.note.content || ''
        }
    }

    render() {

        const optimisticResponse = {
            updateNote: {
                id: this.props.note.id,
                title: this.state.title,
                content: this.state.content,
                color: this.props.note.color,
                updatedAt: new Date().toISOString(),
                __typename: 'Note',
            },
        };

        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    this.props.handleClose();
                    if (!this.state.title && !this.state.content) {
                        return false;
                    }
                    this.props.mutate({
                        variables: {
                            id: this.props.note.id,
                            title: this.state.title,
                            content: this.state.content
                        },
                        optimisticResponse: optimisticResponse
                    })
                }}>
                <TextField
                    hintText="Title"
                    hintStyle={{fontSize: 16, fontWeight: 800}}
                    inputStyle={{fontSize: 16, fontWeight: 800}}
                    fullWidth={true}
                    underlineShow={false}
                    value={this.state.title}
                    onChange={(e) => this.setState({title: e.target.value})}
                />
                <br/>
                <TextField
                    hintText="Take a note..."
                    hintStyle={{fontSize: 14}}
                    inputStyle={{fontSize: 14}}
                    fullWidth={true}
                    underlineShow={false}
                    multiLine={true}
                    rows={1}
                    rowsMax={10}
                    value={this.state.content}
                    onChange={(e) => this.setState({content: e.target.value})}
                />
                <div style={{textAlign: 'right', marginBottom: -20, marginRight: -10, marginLeft: -10}}>
                    <div style={{margin: 4, fontStyle: 'italic', fontSize: 14}}>
                        <small>Edited on {new Date(this.props.note.updatedAt).toLocaleString()}</small>
                    </div>
                    <GridList cellHeight='auto'>
                        <GridTile style={{textAlign: 'left'}}>
                            <NoteColor note={this.props.note}/>
                        </GridTile>
                        <GridTile style={{textAlign: 'right'}}>
                            <FlatButton
                                label="Done"
                                type="submit"
                            />
                        </GridTile>
                    </GridList>

                </div>
            </form>
        )
    }
}

export default graphql(NotesService.mutations.updateNote)(NoteEditor);
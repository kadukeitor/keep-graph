import React, {Component} from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import UserService from "../../Services/User";
import {GridList, GridTile} from 'material-ui/GridList';
import NoteColor from "../NoteColor/NoteColor";
import NotesService from "../../Services/Notes";
import {graphql} from "react-apollo/index";

class NoteCreate extends Component {

    state = {
        collapsed: true,
        loading: false,
        title: '',
        content: '',
        color: 'white'
    };

    constructor(props) {
        super(props);
        this.toggleInput = this.toggleInput.bind(this);
    }

    toggleInput() {
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {

        const user = UserService.getUser();

        let classes = '';

        // Color
        if (this.state.color) {
            classes += ` ${this.state.color}`;
        }

        const styles = {
            width: 'calc(100% - 64px)',
            maxWidth: 600,
            margin: '90px auto 24px',
            textAlign: 'left'
        };

        const update = (cache, {data: {createNote}}) => {
            this.setState({loading: false, title: '', content: ''});
            const data = cache.readQuery({
                query: NotesService.queries.allNotes,
                variables: {
                    orderBy: 'createdAt_DESC', filter: {
                        user: {
                            id: UserService.getUser().userId
                        }
                    }
                }
            });
            if (!data.allNotes.find(note => note.id === createNote.id)) {
                data.allNotes = [createNote, ...data.allNotes];
                cache.writeQuery({
                    query: NotesService.queries.allNotes, variables: {
                        orderBy: 'createdAt_DESC', filter: {
                            user: {
                                id: UserService.getUser().userId
                            }
                        }
                    }, data
                });
            }
        };

        const optimisticResponse = {
            createNote: {
                id: -1,
                title: this.state.title,
                content: this.state.content,
                color: this.state.color,
                updatedAt: new Date().toISOString(),
                __typename: 'Note',
            },
        };

        let collapsed = (
            <Card style={styles} onClick={this.toggleInput} containerStyle={{padding: 0}}>
                <CardText color="#999" padding="0">
                    Take a note...
                </CardText>
            </Card>
        );

        let expanded = (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    this.toggleInput();
                    if (!this.state.title && !this.state.content) {
                        return false;
                    }
                    this.setState({loading: true});
                    this.props.mutate({
                        variables: {
                            title: this.state.title,
                            content: this.state.content,
                            color: this.state.color,
                            userId: user.userId
                        },
                        update: update,
                        optimisticResponse: optimisticResponse
                    })
                }}>
                <Card style={styles} className={classes}>
                    <CardText color="#999" padding="0">
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
                    </CardText>
                    <CardActions style={{textAlign: 'right'}}>
                        <GridList cellHeight='auto'>
                            <GridTile style={{textAlign: 'left'}}>
                                <NoteColor note={this.state} onChange={color => {
                                    this.setState({color: color})
                                }}/>
                            </GridTile>
                            <GridTile style={{textAlign: 'right'}}>
                                <FlatButton
                                    label="Done"
                                    type="submit"
                                />
                            </GridTile>
                        </GridList>
                    </CardActions>
                </Card>
            </form>
        );

        return (
            this.state.collapsed ? collapsed : expanded
        )
    }
}

export default graphql(NotesService.mutations.createNote)(NoteCreate);
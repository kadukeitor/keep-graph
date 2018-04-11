import {graphql} from 'react-apollo';
import React, {Component} from 'react';
import {MenuItem} from 'material-ui';
import NotesService from "../../Services/Notes";
import UserService from "../../Services/User";

class NoteMenuDelete extends Component {

    render() {

        const update = (cache, {data: {deleteNote}}) => {
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
            data.allNotes = data.allNotes.filter(note => note.id !== deleteNote.id);
            cache.writeQuery({
                query: NotesService.queries.allNotes, variables: {
                    orderBy: 'createdAt_DESC', filter: {
                        user: {
                            id: UserService.getUser().userId
                        }
                    }
                }, data
            });
        };

        const optimisticResponse = {
            deleteNote: {
                id: this.props.note.id,
                __typename: 'Note',
            },
        };

        const refetchQueries = [{
            query: NotesService.queries.allNotes,
            variables: {
                orderBy: 'createdAt_DESC', filter: {
                    user: {
                        id: UserService.getUser().userId
                    }
                }
            },
        }];

        return (
            <MenuItem primaryText="Delete note" onClick={() => {
                this.props.mutate({
                    variables: {
                        id: this.props.note.id
                    },
                    update: update,
                    optimisticResponse: optimisticResponse,
                    refetchQueries: refetchQueries
                })
            }}/>
        );
    }

}

export default graphql(NotesService.mutations.deleteNote)(NoteMenuDelete);
import React, {Component} from 'react';
import NotesList from "../NotesList/NotesList";
import UserService from "../../Services/User";
import NotesService from "../../Services/Notes";
import {graphql} from "react-apollo/index";

class NotesContainer extends Component {

    render() {

        const subscribeToNewNote = () => {
            return this.props.data.subscribeToMore({
                document: NotesService.subscriptions.Note,
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    if (subscriptionData.data.Note.mutation === 'CREATED') {
                        const created = subscriptionData.data.Note.node;
                        if (created && !prev.allNotes.find(note => note.id === created.id)) {
                            return Object.assign({}, prev, {allNotes: [created, ...prev.allNotes]});
                        }
                    }
                    // @TODO: Error on previousValues property
                    if (subscriptionData.data.Note.mutation === 'DELETED') {
                        this.props.data.refetch();
                    }
                    return prev;
                }
            })
        };

        return (
            <NotesList {...this.props} subscribeToNewNote={subscribeToNewNote}/>
        )
    }
}

export default graphql(NotesService.queries.allNotes, {
    options: () => ({
        variables: {
            orderBy: 'createdAt_DESC',
            filter: {
                user: {
                    id: UserService.getUser().userId
                }
            }
        },
    })
})(NotesContainer);
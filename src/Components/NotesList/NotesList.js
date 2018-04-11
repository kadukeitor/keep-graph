import React, {Component} from 'react';
import * as Masonry from 'masonry-layout';
import Note from "../../Components/Note/Note";

class NotesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            masonry: null
        };
    }

    componentDidMount() {
        const elem = document.querySelector('.NotesList');
        const masonry = new Masonry(elem, {
            itemSelector: '.Note',
            columnWidth: 240,
            isFitWidth: true
        });
        this.setState({
            masonry: masonry
        });
        this.props.subscribeToNewNote();
    }

    componentDidUpdate() {
        if (this.state.masonry) {
            this.state.masonry.reloadItems();
            this.state.masonry.layout();
        }
    }

    render() {
        return (
            <div className="NotesList" style={{margin: 'auto'}}>
                {this.props.data.allNotes && this.props.data.allNotes.map((note) => (
                    <Note key={note.id} note={note}/>
                ))}
            </div>
        )
    }
}

export default NotesList

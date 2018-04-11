import React, {Component} from 'react';
import NoteCreate from "../../Components/NoteCreate/NoteCreate";
import NotesContainer from "../../Components/NotesContainer/NotesContainer";
import AppLayout from "../../Components/AppLayout/AppLayout";

class Home extends Component {

    render() {
        return (
            <div>
                <AppLayout history={this.props.history}/>
                <div className="Home-Content">
                    <NoteCreate/>
                    <NotesContainer/>
                </div>
            </div>
        )
    }
}

export default Home
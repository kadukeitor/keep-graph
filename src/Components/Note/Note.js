import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import NoteMenu from "../NoteMenu/NoteMenu";
import NoteEditor from "../NoteEditor/NoteEditor";
import NoteColor from "../NoteColor/NoteColor";

class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            hover: false
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    };

    render() {

        let classes = '';

        // Color
        if (this.props.note.color) {
            classes += ` ${this.props.note.color}`;
        }

        // Hover
        if (this.state.hover) {
            classes += 'hover';
        }

        // Color
        if (this.props.note.color) {
            classes += ` ${this.props.note.color}`;
        }

        // Font Size
        let fontSize = 14;
        const words = this.props.note.content ? this.props.note.content.split(' ').length : 0;
        if ((words >= 1) && (words < 10)) {
            fontSize = 36;
        } else if ((words >= 10) && (words < 20)) {
            fontSize = 28;
        } else if ((words >= 20) && (words < 30)) {
            fontSize = 24;
        } else if ((words >= 30) && (words < 40)) {
            fontSize = 18;
        }

        return (
            <div className='Note' style={{width: 220, padding: 8}}>
                <Card className={classes}
                      onMouseEnter={this.onMouseEnter}
                      onMouseLeave={this.onMouseLeave}>
                    <CardHeader onClick={this.handleOpen}
                                style={{fontWeight: 'bolder'}}
                                title={this.props.note.title}
                    />
                    <CardText onClick={this.handleOpen}
                              padding="0" style={{fontSize: fontSize}}>
                        {this.props.note.content}
                    </CardText>
                    <CardActions style={{opacity: this.state.hover ? 1 : 0, padding: 0, textAlign: 'right'}}>
                        <NoteColor note={this.props.note}/>
                        <NoteMenu note={this.props.note}/>
                    </CardActions>
                </Card>
                    <Dialog
                    modal={false}
                    open={this.state.open}
                    contentStyle={{width: 600}}
                    bodyClassName={classes}
                    onRequestClose={this.handleClose}>
                    <NoteEditor note={this.props.note} handleClose={this.handleClose}/>
                </Dialog>
            </div>
        )
    }
}

export default Note
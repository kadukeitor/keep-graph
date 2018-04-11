import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {blue500} from 'material-ui/styles/colors';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Mutation} from "react-apollo";
import UserService from "../../Services/User";

class SignUp extends Component {

    state = {
        dialog: false,
        loading: false,
        error: '',
        email: '',
        password: '',
        password_confirmation: ''
    };

    render() {

        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                paddingTop: 64
            }
        };

        const update = () => {
            this.setState({loading: false, dialog: true});
        };

        const onError = () => {
            this.setState({
                loading: false,
                password: '',
                password_confirmation: '',
                error: 'User already exists with that information'
            });
        };

        return (
            <Mutation mutation={UserService.mutations.createUser} update={update} onError={onError}>
                {(createUser) => (
                    <div style={styles.root}>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                this.setState({loading: true, error: ''});
                                createUser({
                                    variables: {
                                        email: {
                                            email: this.state.email,
                                            password: this.state.password
                                        }
                                    }
                                })
                            }}>
                            <GridList style={{width: 340}} cellHeight='auto' cols={1}>
                                <GridTile style={{paddingBottom: 64}}>
                                    <Paper zDepth={1} style={{padding: 32}}>
                                        <h2>Sign up</h2>
                                        <small>to create your <b>Keep Graph</b> Account</small>
                                        <TextField
                                            fullWidth={true}
                                            floatingLabelText="Email"
                                            errorText={this.state.error}
                                            value={this.state.email}
                                            type='email'
                                            onChange={(e) => this.setState({email: e.target.value})}
                                        />
                                        <TextField
                                            fullWidth={true}
                                            type="password"
                                            floatingLabelText="Password"
                                            value={this.state.password}
                                            onChange={(e) => this.setState({password: e.target.value})}
                                        />
                                        <TextField
                                            fullWidth={true}
                                            type="password"
                                            floatingLabelText="Confirm Password"
                                            value={this.state.password_confirmation}
                                            onChange={(e) => this.setState({password_confirmation: e.target.value})}
                                        /><br/>
                                        <br/><br/>
                                        <GridList cellHeight='auto'>
                                            <GridTile style={{textAlign: 'left'}}>
                                                <Link to="/signIn" style={{color: blue500, textDecoration: 'none'}}>
                                                    I have an account
                                                </Link>
                                            </GridTile>
                                            <GridTile style={{textAlign: 'right'}}>
                                                <RaisedButton label="Sign Up"
                                                              disabled={this.state.password !== this.state.password_confirmation ||
                                                              !this.state.email ||
                                                              !this.state.password}
                                                              secondary={true} type="submit"/>
                                            </GridTile>
                                        </GridList>
                                    </Paper>
                                </GridTile>
                            </GridList>
                        </form>
                        <Dialog
                            contentStyle={{width: 320}}
                            title="Account Created"
                            actions={<FlatButton
                                label="Ok"
                                primary={true}
                                onClick={() => {
                                    this.props.history.replace("/signIn");
                                }}
                            />}
                            modal={true}
                            open={this.state.dialog}>
                            Your account has been created. Sign in to create your notes.
                        </Dialog>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default SignUp
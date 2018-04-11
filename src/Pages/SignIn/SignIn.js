import React, {Component} from 'react';
import {Mutation} from "react-apollo";
import {Link} from 'react-router-dom';
import {blue500} from 'material-ui/styles/colors';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import UserService from "../../Services/User";

class SignIn extends Component {

    state = {
        loading: false,
        error: '',
        email: '',
        password: '',
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

        const update = (cache, {data: {signinUser}}) => {
            this.setState({loading: false});
            UserService.setToken(signinUser.token);
            this.props.history.replace("/");
        };

        const onError = () => {
            this.setState({loading: false, password: '', error: 'No user found with that information'});
        };

        return (
            <Mutation mutation={UserService.mutations.signinUser} update={update} onError={onError}>
                {(signinUser) => (
                    <div style={styles.root}>
                        <form
                            onSubmit={e => {
                                this.setState({loading: true, error: ''});
                                e.preventDefault();
                                signinUser({
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
                                        <h2>Sign in</h2>
                                        <small>with your <b>Keep Graph</b> Account</small>
                                        <TextField
                                            type="email"
                                            fullWidth={true}
                                            floatingLabelText="Email"
                                            errorText={this.state.error}
                                            value={this.state.email}
                                            onChange={(e) => this.setState({email: e.target.value})}
                                        />
                                        <TextField
                                            fullWidth={true}
                                            type="password"
                                            floatingLabelText="Password"
                                            value={this.state.password}
                                            onChange={(e) => this.setState({password: e.target.value})}
                                        /><br/>
                                        <br/><br/>
                                        <GridList cellHeight='auto'>
                                            <GridTile style={{textAlign: 'left'}}>
                                                <Link to="/signUp" style={{color: blue500, textDecoration: 'none'}}>
                                                    Create account
                                                </Link>
                                            </GridTile>
                                            <GridTile style={{textAlign: 'right'}}>
                                                <RaisedButton label="Sign In" secondary={true} type="submit"/>
                                            </GridTile>
                                        </GridList>
                                    </Paper>
                                </GridTile>
                            </GridList>
                        </form>
                    </div>

                )}
            </Mutation>
        )
    }
}

export default SignIn
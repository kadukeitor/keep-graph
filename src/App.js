import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Switch, Route, Redirect} from 'react-router-dom';
import {darkBlack, amber500, blue500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import client from './Services/Apollo';

import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import UserService from "./Services/User";

const PublicRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        UserService.isAuthenticated() ? (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        ) : (
            <Component {...props}/>
        )
    )}/>
);

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        UserService.isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/signIn',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

class App extends Component {
    render() {

        const theme = getMuiTheme({
            palette: {
                primary1Color: amber500,
                accent1Color: blue500,
                textColor: darkBlack,
            },
            appBar: {
                textColor: darkBlack
            }
        });

        return (
            <ApolloProvider client={client}>
                <MuiThemeProvider muiTheme={theme}>
                    <Switch>
                        <PublicRoute path='/signIn' component={SignIn}/>
                        <PublicRoute path='/signUp' component={SignUp}/>
                        <PrivateRoute path='/' component={Home}/>
                        <Redirect to={{pathname: '/'}}/>
                    </Switch>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}

export default App;

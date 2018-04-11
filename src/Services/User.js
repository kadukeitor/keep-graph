import jwtDecode from 'jwt-decode';
import gql from "graphql-tag";

const tokenKey = 'keep-graph-token';

const getToken = () => {
    return localStorage.getItem(tokenKey);
};

const setToken = (token) => {
    localStorage.setItem(tokenKey, token);
};

const removeToken = () => {
    localStorage.removeItem(tokenKey);
};

const decodeToken = (token) => {
    return jwtDecode(token);
};

const getUser = () => {
    let token = getToken();
    return decodeToken(token);
};

const isValidToken = (token) => {
    let decoded = decodeToken(token);
    return (decoded.exp < new Date().getTime())
};

const isAuthenticated = () => {
    const token = getToken();
    if (!token) {
        return false;
    }
    return isValidToken(token);
};

const queries = {};

const mutations = {
    signinUser: gql`
          mutation signinUser($email: AUTH_PROVIDER_EMAIL) {
            signinUser(email: $email) {
              token
            }
          }
        `,
    createUser: gql`
          mutation createUser($email: AUTH_PROVIDER_EMAIL) {
            createUser(authProvider: {email: $email}) {
              id
            }
          }
        `
};

const subscriptions = {};

const UserService = {

    queries: queries,
    mutations: mutations,
    subscriptions: subscriptions,

    getToken: getToken,
    setToken: setToken,
    removeToken: removeToken,
    getUser: getUser,
    isAuthenticated: isAuthenticated

};

export default UserService
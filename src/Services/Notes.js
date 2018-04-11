import gql from "graphql-tag";

const queries = {
    allNotes: gql`
          query allNotes ($orderBy: NoteOrderBy, $filter: NoteFilter) {
            allNotes (filter: $filter, orderBy: $orderBy) {
              id
              title
              content
              color
              updatedAt
            }
          }
        `
};

const mutations = {
    createNote: gql`
          mutation createNote($title: String, $content: String, $color: String, $userId: ID) {
            createNote(title: $title, content: $content, color: $color, userId: $userId ) {
              id
              title
              content
              color
              updatedAt
            }
          }
        `,
    deleteNote: gql`
          mutation deleteNote($id: ID!) {
            deleteNote(id: $id) {
              id
            }
          }
        `,
    updateNote: gql`
          mutation updateNote($id: ID!, $title: String , $content: String, $color: String) {
            updateNote( id: $id, title: $title, content: $content, color: $color ) {
              id
              title
              content
              color
              updatedAt
            }
          }
        `,
};

const subscriptions = {
    Note: gql`
          subscription {
            Note (
                filter: {
                  mutation_in: [CREATED,DELETED,UPDATED],
                }
            ){
                mutation
                node {
                  id
                  title
                  content
                  color
                  updatedAt
                }
             }
          }
        `
};

const NotesService = {
    queries: queries,
    mutations: mutations,
    subscriptions: subscriptions
};

export default NotesService
import gql from "graphql-tag";

const getUser = gql`
    query getUser($id: Int!) {
        user(id: $id) {
            id
            firstName
            lastName
        }
    }
`;

export default getUser;

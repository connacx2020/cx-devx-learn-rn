import { gql } from "apollo-boost";

const UserInfoFragment = {
    userInfo: gql`
    fragment UserInfoData on UserType {
        id
        type
        gender
        roles
        name
        photo
        displayName
        dob
        phones
        about
        roles
        nationality
        weblinks {
            source
            url
        }
        addresses {
            city
            addressL1
            state
            country
            geolocation
            isCurrent
        }
        educations {
            study
            org {
                id
                name
                type
            }
            awards {
                title
                description
                eventID
                awardedBy
                awardedOn
                tags
            }
            certs {
                title
                description
                awardedBy
                awardedOn
                tags
            }
            to
            from
            isCurrent
        }

        professions {
            title
            org {
                id
                name
                type
            }
            from
            to
            isCurrent
        }
    }
    `
};

export const loginSchema = gql`
mutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
        id
        displayName
        name
        token
        email
        confirmed
    }
}
`;

export const getUsersSchema = gql`
query{
    getUsers{
      id
      name
      displayName
    }
    }
`;

export const getUserInfoByIdSchema = gql`
    query getUserInfoByID($userID: ID!) {
        getUserInfoByID(id: $userID) {
            ...UserInfoData
        }
    }
    ${UserInfoFragment.userInfo}
`;

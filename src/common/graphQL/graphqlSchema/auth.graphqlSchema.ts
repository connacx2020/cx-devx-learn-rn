import { gql } from "apollo-boost";

const UserInfo_Fragment = {
    userInfo: gql`
    fragment UserInfoData on UserType {
        id
      type
      gender
      name
      photo
      displayName
      dob
      weblinks{
        source
        url
      }
      addresses{
        city
        addressL1
        state
        country
        geolocation
        isCurrent
      }
      phones
      about
      educations{
        study
        org {
            id
          name
          type
        }
        awards{
            title
            description
            eventID
            awardedBy
            awardedOn
            tags
          }
          certs{
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

      professions{
        title
        org{
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
query($userID: ID!){
    getUserInfoByID(id:$userID){
        ...UserInfoData
    }
  }
  ${UserInfo_Fragment.userInfo}
  `;

import gql from 'graphql-tag';

export const isFollowedSchema = gql`
query ($userID1: ID!, $userID2: ID!) {
    checkIsFollowed(input:{
        id1: $userID1,
        id2: $userID2
    })
  }`;
  export const followUserSchema = gql`
    mutation ($userID1:ID!, $userID2:ID!){
        followUser(input:{
            id1: $userID1,
            id2: $userID2
        })
    }
  `
  export const unfollowUserSchema = gql`
    mutation ($userID1:ID!, $userID2:ID!){
        unfollowUser(input:{
            id1: $userID1,
            id2: $userID2
        })
    }
  `
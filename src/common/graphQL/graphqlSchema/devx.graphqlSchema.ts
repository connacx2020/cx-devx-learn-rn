import gql from 'graphql-tag';

const topic_Fragment = {
    topic: gql`
    fragment TopicQuery on TopicType {
        id
        title
        description
        logo
        parentTopic
    }
    `
}

export const searchTopicsByTextSchema = gql`
query searchTopicsByText($text: String!) {
    searchTopicsByText(text: $text) {
        ...TopicQuery
    }
}
  ${topic_Fragment.topic}
  `;

export const getAllTopicsSchema = gql`
query{
  findAllTopic{
    ...TopicQuery
  }
}
${topic_Fragment.topic}
`;

export const findTopicByIDSchema = gql`
query($topicID: ID!){
  findTopicByID(id: $topicID){
    ...TopicQuery
  }
}
${topic_Fragment.topic}
`;

export const createTopicSchema = gql`
mutation ($title: String!,$description: String!,$parentTopic: String!,$contexts:[String!]!) {
    createTopic(
      input: {
        title: $title,
        description: $description,
        parentTopic: $parentTopic
        contexts: $contexts
      }
    ) {
      id
    }
  }`;

export const getPaginatedTopicsSchema = gql`
query($cursor: ID){
  getPaginatedTopics(input:{
		limit:5,
    cursor:$cursor
  }){
    edges{
      cursor
      topic{
        ...TopicQuery
      }
    }
    pageInfo{
      endCursor
      hasNextPage
    }
  }
}
  ${topic_Fragment.topic}
`;

export const getPaginatedTopicsByTextSchema = gql`
query($text: String!$limit: Int!, $offset: Int!){
    getPaginatedTopicByText(input:{
        limit: $limit,
        text:  $text,
        offset: $offset
  }){
      topics{
       ...TopicQuery
      }
      hasNextPage
}
}
${topic_Fragment.topic}
`;

export const isLikedTopicSchema = gql`
  query($userID: ID!, $topicID: ID!) {
    isLikedTopic(input:{
        userID: $userID,
        topicID: $topicID
    })
  }
`;

export const likeTopicSchema = gql`
mutation($userID: ID!, $topicID: ID!){
  likeTopic(input:{
      userID: $userID,
      topicID: $topicID
  })
}
`;

export const unlikeTopicSchema = gql`
mutation ($userID: ID!, $topicID: ID!){
  unlikeTopic(input:{
      userID: $userID,
      topicID: $topicID
  })
}
`;

export const getRootTopicsSchema = gql`
query getAllRootTopics {
  getAllRootTopics{
    topics{
      title
      logo
      id
      description
      parentTopic
    }
  }
}
`;

export const getChildTopicsSchema = gql`
query getChildTopics($topicID:ID!){
    getAllChildTopics(topicID:$topicID){
        topics{
          title
          logo
          id
          description
          parentTopic
        }
      }
}
`;

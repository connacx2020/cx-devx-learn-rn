import gql from 'graphql-tag';

const topic_Fragment = {
    topic: gql`
    fragment TopicQuery on TopicType {
        id
        title
        description
        logo
        parentTopic
        likes
        followers
        contexts
    }
    `
}

export const searchTopicsByTextSchema = gql`
query($text:String!){
    searchTopicsByText(text:$text){
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
query($id: ID!){
  findTopicByID(id: $id){
    ...TopicQuery
  }
}
${topic_Fragment.topic}
`;

export const updateTopicLogoSchema = gql`
mutation($id: ID!, $logoUrl:String!) {
  addLogoUrl(input:{
    id:$id,
    logoUrl:$logoUrl
  })
}
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

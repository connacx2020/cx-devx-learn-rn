import gql from "graphql-tag";

const PostData_Fragment = {
  postResult: gql`
    fragment PostRequestData on PostType {
        id
        author {
            photo
            name
            id
        }
        authorID
        title
        isPublished
        seriesID
        series {
            id
            title
        }
        media {
            mimetype
            filename
            uri
            encoding
        }
        category
        content
        comments {
            id
            authorID
            content
            commentedOn
            author {
                id
                name
                photo
            }
        }
        topics {
          topicIDs
        }
        access
        tags
        postedOn
        modifiedOn
    }
    `,
};

export const getAllPostsSchema = gql`
query getPostsWithFilters{
  getPostsWithFilters {
    id
    content
    tags
    author {
      photo
      name
      id
    }
    authorID
    title
    isPublished
    seriesID
    category
    access
    postedOn
    topics {
      topicIDs
    }
  }
}
`;

export const getPostByIDSchema = gql`
query fetchPostByID($postID:ID!){
  searchPostByID(postID:$postID) {
        ...PostRequestData
  }
}
${PostData_Fragment.postResult}
`;

export const getCommentByPostIDSchema = gql`
query fetchPostByID($postID:ID!){
  searchPostByID(postID:$postID) {
    comments {
      id
      authorID
      content
      commentedOn
      author {
          id
          name
          photo
      }
    }
  }
}
`;

export const addCommentSchema = gql`
mutation(
    $postID: ID!,
    $authorID: ID!,
    $content : String!,
    $comments: [CommentInput!]!
  ){
    addComment(input: {
      postID: $postID,
      comment: {
        authorID: $authorID,
        content:$content,
        comments:$comments,
      }
    })

  }`;


export const getPostRelatedUsersSchema = gql`
    query getPostRelatedUsers($postID: ID!, $option: String!) {
        getPostRelatedUsers(id: $postID, relation: $option) {
            users {
                id
                name
                displayName
                photo
            }
        }
    }
`;

export const isPostLikedSchema = gql`
query isPostLikedByUser($postID: ID!, $authorID: ID!){
  isPostLikedByUser(postID: $postID, authorID: $authorID)
}`;

export const addLikeSchema = gql`
mutation likePost($postID: ID!, $userID: ID!){
    likePost(postID: $postID, userID: $userID )
}`;

export const removeLikeSchema = gql`
mutation unlikePost($postID: ID!, $userID: ID!){
    unlikePost(postID: $postID, userID: $userID )
}`;

export const getLikedUserSchema = gql`
  query getPostLikedUsers($postID: String!){
    getPostLikedUsers(postID:$postID)
  }
`;

export const searchPostsByTextSchema = gql`
query($text: String!) {
  searchPostsByText(text:$text) {
    ...PostRequestData
  }
}
${PostData_Fragment.postResult}
`;

export const addViewSchema = gql`
mutation($postID: ID!, $authorID: ID!){
  addViewCount(postID: $postID, authorID: $authorID)
}`;

export const isViewedSchema = gql`
query ($postID: String!, $authorID: String!) {
  isViewed(postID:$postID, authorID:$authorID)
}`;

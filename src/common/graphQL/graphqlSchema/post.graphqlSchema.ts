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
        access
        tags
        postedOn
        modifiedOn
    }
    `,
};


export const getAllPostsSchema = gql`
{
    getPostsWithFilters{
    id
    title
    seriesID
  }
}
`;



export const getPostByIDSchema = gql`
query($postID: ID!){
	searchPostByID(postID:$postID) {
        ...PostRequestData
  }
}
${PostData_Fragment.postResult}
`;

export const addCommentSchema = gql`
mutation(
    $postID: ID!,
    $authorID: ID!,
    $content : String!,
    $likes: Int!,
    $comments: [CommentInput!]!
  ){
    addComment(input: {
      postID: $postID,
      comment: {
        authorID: $authorID,
        content:$content,
        likes: $likes,
        comments:$comments,
      }
    })

  }`;


export const getPostRelatedUsersSchema = gql`
    query getPostRelatedUsers($postID: ID!, $option: String!) {
        getPostRelatedUsers(input: { id: $postID, relation: $option }) {
            users {
                id
                name
                displayName
                photo
            }
        }
    }
`;

export const isLikedPostSchema = gql`
query checkUserLikedpost($postID: ID!, $authorID: ID!){
    checkUserLikedPost(input:{
      postID: $postID,
      authorID: $authorID,
    })
}`;

export const addLikeSchema = gql`
mutation likePost($postID: ID!, $authorID: ID!){
    likePost(input: { postID: $postID, sourceUser: $authorID })
}`;

export const removeLikeSchema = gql`
mutation unlikePost($postID: ID!, $authorID: ID!){
    unlikePost(input: { postID: $postID, sourceUser: $authorID })
}`;

export const getLikedUserSchema = gql`
  query ($postID: String!){
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
  addViewCount(input:{
      postID: $postID,
      authorID: $authorID,
    })
}`;

export const isViewedSchema = gql`
query ($postID: String!, $authorID: String!) {
  isViewed(input:{
    postID:$postID,
    authorID:$authorID
  })
}`;

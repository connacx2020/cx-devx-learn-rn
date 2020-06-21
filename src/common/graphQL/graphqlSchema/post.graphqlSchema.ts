import gql from "graphql-tag";

const PostData_Fragment = {
  postResult: gql`
    fragment PostRequestData on PostType {
      id
      authorID
      title
      category
      content
      seriesID
      likes
      views
      shares
      comments{
        id
        authorID
        content
        likes
        comments {
          id
          authorID
          content
          likes
        }
        commentedOn
        modifiedOn
      }
      access
      postedOn
      modifiedOn
      }
  `
}

export const getAllPostsSchema = gql`
query{
  getPosts{
    ...PostRequestData
  }
}
${PostData_Fragment.postResult}
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

export const addLikeSchema = gql`
mutation($postID: ID!, $authorID: ID!){
  addLike(input:{
      postID: $postID,
      authorID: $authorID,
    })
}`;

export const removeLikeSchema = gql`
mutation($postID: ID!, $authorID: ID!){
    removeLike(input:{
      postID: $postID,
      authorID: $authorID,
    })
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


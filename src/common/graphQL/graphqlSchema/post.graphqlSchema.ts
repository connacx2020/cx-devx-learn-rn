import gql from "graphql-tag";

const PostData_Fragment = {
    postResult: gql`
    fragment PostRequestData on PostType {
    id
      authorID
      title
      category
      content
      published
      likes
      views
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
              commentedOn
              modifiedOn
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
{
  getPosts{
    id
  }
}
`;

export const getPostFeedsSchema = gql`
query($userID: String!){
	getPostFeeds(userID:$userID) {
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

export const getNextPostIDSchema = gql`
query($postID: String!) {
  getNextPost(postID:$postID)
}
`;

export const getPrevPostIDSchema = gql`
query($postID: String!) {
  getPrevPost(postID:$postID)
}
`;

export const getPaginatedPostsSchema = gql`
query($cursor: String, $userID: ID!){
    getPaginatedPosts(input: {
        limit: 1,
        cursor: $cursor
        userID: $userID
    }) {
        edges{
            cursor
            post{
               ...PostRequestData
            }
        }
        pageInfo{
            endCursor
            hasNextPage
        }
    }
}
${PostData_Fragment.postResult}
`;

export const addPostSchema = gql`
mutation(
  $authorID: ID!,
	$title:String!,
	$category:String!,
  $content:String!,
  $published: Boolean!,
  $isSeries: Boolean!,
	$access: String!) {
  	addPost(input: {
  	authorID: $authorID
  	title: $title
  	category: $category
    content: $content
    published: $published
    isSeries: $isSeries
  	access: $access
  	}) {
    	id
  	}
}
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

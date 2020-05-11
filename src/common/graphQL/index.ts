export {
    addPostSchema,
    addCommentSchema,
    addLikeSchema,
    getPostFeedsSchema,
    removeLikeSchema,
    searchPostsByTextSchema,
    isViewedSchema,
    addViewSchema,
    getAllPostsSchema,
    getPostByIDSchema,
    getPaginatedPostsSchema
} from './graphqlSchema/post.graphqlSchema';

export {
    getUserInfoByIdSchema,
    getUsersSchema,
    loginSchema
} from './graphqlSchema/auth.graphqlSchema';

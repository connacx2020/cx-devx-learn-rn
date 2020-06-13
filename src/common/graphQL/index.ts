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

export {
    findTopicByIDSchema,
    getAllTopicsSchema
} from './graphqlSchema/devx.graphqlSchema';

export {
    getCoursesSchema,
    searchCourseByTitle,
    getAllCourseByAuthorID,
    getCourseByIdSchema,
    createCourseSchema
} from './graphqlSchema/course.graphqlSchema';

export {
    isFollowedSchema,
    followUserSchema,
    unfollowUserSchema
} from './graphqlSchema/connect.graphql.Schema';

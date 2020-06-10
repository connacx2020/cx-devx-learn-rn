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
    getCourseById
} from './graphqlSchema/course.graphqlSchema';

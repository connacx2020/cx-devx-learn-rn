export {

    addCommentSchema,
    addLikeSchema,
    removeLikeSchema,
    searchPostsByTextSchema,
    isViewedSchema,
    addViewSchema,
    getPostByIDSchema,
    getLikedUserSchema
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
    getPostSeriesByIdSchema,
    getCourseByIdSchema,
    getAllPostSeriesSchema,
    createCourseSchema
} from './graphqlSchema/course.graphqlSchema';

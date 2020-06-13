export {

    addCommentSchema,
    addLikeSchema,
    removeLikeSchema,
    searchPostsByTextSchema,
    isViewedSchema,
    addViewSchema,
    getPostByIDSchema,
    getNextPostIDSchema,
    getPrevPostIDSchema
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
    getCourseById,
    getPostSeriesByIdSchema
} from './graphqlSchema/course.graphqlSchema';

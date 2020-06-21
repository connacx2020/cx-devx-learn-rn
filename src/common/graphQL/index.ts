export {

    addCommentSchema,
    addLikeSchema,
    removeLikeSchema,
    searchPostsByTextSchema,
    isViewedSchema,
    addViewSchema,
    getPostByIDSchema,
    getLikedUserSchema,
    getAllPostsSchema
} from './graphqlSchema/post.graphqlSchema';

export {
    getUserInfoByIdSchema,
    getUsersSchema,
    loginSchema
} from './graphqlSchema/auth.graphqlSchema';

export {
    findTopicByIDSchema,
    getAllTopicsSchema,
    isLikedTopicSchema,
    likeTopicSchema,
    unlikeTopicSchema
} from './graphqlSchema/devx.graphqlSchema';

export {
    getCoursesSchema,
    searchCourseByTitle,
    getPostSeriesByIdSchema,
    getAllCourseByAuthorID,
    getCourseByIdSchema,
    getAllPostSeriesSchema,
    createCourseSchema,
    checkUserIsEnrolledSchema,
    enrollCourseSchema,
    unenrollCourseSchema,
    uploadCoursePicSchema
} from './graphqlSchema/course.graphqlSchema';

export {
    isFollowedSchema,
    followUserSchema,
    unfollowUserSchema
} from './graphqlSchema/connect.graphql.Schema';

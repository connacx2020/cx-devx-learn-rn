import gql from 'graphql-tag';

const CourseInfoFragment = {
    courseInfo: gql`
    fragment CourseData on CourseType {
        id
        authorID
        title
        rating
        photoUrl
        description
        price
        duration
        prerequisites
        outcomes
        seriesID
    }
    `,
};

export const getAllCourseByAuthorID = gql`
    query getCourseByInstructorID($authorID: ID!) {
        findCoursesByInstructorID(id: $authorID) {
            id
            title
            rating
            photoUrl
            price
        }
    }
`;

export const getEnrolledCoursesByUserIdSchema = gql`
    query getEnrolledCourses($userID: ID!) {
        findEnrolledCourses(userID: $userID) {
            ...CourseData
        }
    }
    ${CourseInfoFragment.courseInfo}
`;

export const getCoursesSchema = gql`
    query getAllCourses {
        getAllCourses {
            ...CourseData
        }
    }
    ${CourseInfoFragment.courseInfo}
`;

export const getCourseByIdSchema = gql`
    query getCourseById($courseID: ID!) {
        findCourseByID(id: $courseID) {
            ...CourseData
        }
    }
    ${CourseInfoFragment.courseInfo}
`;

export const searchCourseByTitle = gql`
    query findCourseByTitle($courseTitle: String!) {
        findCourseByTitle(courseTitle: $courseTitle) {
            ...CourseData
        }
    }

    ${CourseInfoFragment.courseInfo}
`;

export const getAllPostSeriesSchema = gql`
    query getAllSeries {
        getAllSeries {
            id
            title
        }
    }
`;

export const getPostSeriesByIdSchema = gql`
    query getPostSeries($seriesID: ID!) {
        getPostSeries(seriesID: $seriesID) {
            posts {
                title
                id
            }
        }
    }
`;

export const createCourseSchema = gql`
    mutation createNewCourse(
        $authorID: ID!
        $title: String!
        $photoUrl: String!
        $seriesID: ID!
        $duration: String!
        $description: String!
        $outcome: [String!]!
        $requirements: [String!]!
        $topicID: [ID!]!
    ) {
        createNewCourse(
            courseData: {
                authorID: $authorID
                title: $title
                photoUrl: $photoUrl
                seriesID: $seriesID
                duration: $duration
                description: $description
                outcome: $outcome
                prerequisite: $requirements
                topicID: $topicID
            }
        )
    }
`;

export const checkUserIsEnrolledSchema = gql`
    query checkUserIsEnrolled($courseID: ID!, $userID: ID!) {
        checkUserIsEnrolled(enrollData: { courseID: $courseID, userID: $userID })
    }
`;

export const enrollCourseSchema = gql`
    mutation enrollCourse($courseID: ID!, $userID: ID!) {
        enrollCourse(enrollData: { courseID: $courseID, userID: $userID })
    }
`;

export const unenrollCourseSchema = gql`
    mutation unenrollCourse($courseID: ID!, $userID: ID!) {
        unenrollCourse(enrollData: { courseID: $courseID, userID: $userID })
    }
`;

export const uploadCoursePicSchema = gql`
    mutation uploadCoursePhoto($file: Upload!) {
        uploadCoursePhoto(file: $file) {
            encoding
            mimetype
            filename
            uri
        }
    }
`;

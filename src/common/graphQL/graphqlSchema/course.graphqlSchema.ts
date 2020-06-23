import gql from "graphql-tag";

const Course_Info_Fragment = {
    courseInfo: gql`
    fragment CourseData on CourseType {
    id
    authorID
    title
    rating
    photoUrl
    enrolled
    description
    price
    duration
    prerequisite
    outcome
    seriesID
    topicID
    enrolledUsers
}`
};

export const getAllCourseByAuthorID = gql`
    query($authorID: ID!){
        getCoursesByAuthorId(authorID:$authorID){
            id
            title
            rating
            price
            photoUrl
            enrolled
        }

    }
`



export const getCoursesSchema = gql`
query{
        getAllCourses {
        ...CourseData
    }
}
${Course_Info_Fragment.courseInfo}
`;

export const getCourseByIdSchema = gql`
query($courseID: ID!){
 getCourseById(courseId: $courseID){
    ...CourseData
  }
  }
  ${Course_Info_Fragment.courseInfo}
`;


export const searchCourseByTitle = gql`
query($courseTitle: String!){
    findCourseWithTitle(courseTitle: $courseTitle){
      ...CourseData
  }
}

${Course_Info_Fragment.courseInfo}
`;

export const getAllPostSeriesSchema= gql`
query {
  getAllSeries{
    id
    title
  }
}
`;

export const getPostSeriesByIdSchema = gql`
query ($seriesID: ID!){
    getPostSeries(seriesID: $seriesID){
      id
      title
      posts{
        id
        title
      }
    }
  }`;

export const createCourseSchema = gql`
mutation($authorID: ID!,$title: String!,$photoUrl: String!,$seriesID: ID!,$duration: String! ,$description: String!,$outcome: [String!]!,$requirements: [String!]!, $topicID: [ID!]!){
  createNewCourse(courseData:{
    authorID: $authorID
    title: $title
    photoUrl: $photoUrl
    seriesID: $seriesID
    duration: $duration
    description: $description
    outcome: $outcome
    prerequisite: $requirements
    topicID: $topicID
  })
}
`;

export const checkUserIsEnrolledSchema = gql`
  query($courseID: ID!, $userID: ID!){
    checkUserIsEnrolled(enrollData:{
      courseID: $courseID,
      userID: $userID
    })
  }
`;

export const enrollCourseSchema = gql`
  mutation($courseID: ID!, $userID: ID!){
    enrollCourse(enrollData:{
      courseID: $courseID,
      userID: $userID
    })
  }
`;

export const unenrollCourseSchema = gql`
  mutation($courseID: ID!, $userID: ID!){
    unenrollCourse(enrollData:{
      courseID: $courseID,
      userID: $userID
    })
  }
`;

export const uploadCoursePicSchema = gql`
 mutation($file: Upload!){
    uploadCoursePhoto(file: $file) {
    encoding
    mimetype
    filename
    uri
  }
}`;

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
    duration
    prerequisite
    outcome
    seriesId
    topicID
}`
};

export const getAllCourseByAuthorID = gql`
    query($authorId: ID!){
        getCoursesByAuthorId(authorId:$authorId){
            id
            title
            rating
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
query ($seriesId: ID!){
    getPostSeries(seriesID: $seriesId){
      id
      title
      posts{
        id
        title
      }
    }
  }`;

export const createCourseSchema = gql`
mutation($authorID: ID!,$title: String!,$photoUrl: String!,$seriesId: ID!,$duration: String! ,$description: String!,$outcome: [String!]!,$requirements: [String!]!, $topicID: [ID!]!){
  createNewCourse(courseData:{
    authorID: $authorID
    title: $title
    photoUrl: $photoUrl
    seriesId: $seriesId
    duration: $duration
    description: $description
    outcome: $outcome
    prerequisite: $requirements
    topicID: $topicID
  })
}
`;

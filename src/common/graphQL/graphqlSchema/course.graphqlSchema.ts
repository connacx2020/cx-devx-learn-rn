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
}`
};



export const getCoursesSchema = gql`
query{
        getAllCourses {
        ...CourseData
    }
}
${Course_Info_Fragment.courseInfo}
`;

export const getCourseById = gql`
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

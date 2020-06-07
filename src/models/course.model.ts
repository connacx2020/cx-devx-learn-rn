export interface Course {
    id: string,
    authorID: string,
    title: string,
    rating: string,
    photoUrl: string,
    courseContent: [string],
    enrolled: number,
}

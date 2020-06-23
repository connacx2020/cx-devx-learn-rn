export interface Course {
    id: string,
    authorID: string,
    title: string,
    rating: number,
    price: number,
    photoUrl: string,
    seriesID: string,
    enrolled: number,
    description: string,
    duration: string,
    outcome: [string],
    prerequisite: [string],
    topicID: string,
    enrolledUsers:[String]
}

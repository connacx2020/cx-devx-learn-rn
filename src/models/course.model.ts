export interface Course {
    id: string,
    authorID: string,
    title: string,
    rating: number,
    photoUrl: string,
    seriesId: string,
    enrolled: number,
    description: string,
    duration: string,
    outcome: [string],
    prerequisite: [string]
}
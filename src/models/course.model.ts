export interface Course {
    id: string;
    authorID: string;
    title: string;
    rating: number;
    price: number;
    photoUrl: string;
    seriesID: string;
    enrolls: number;
    description: string;
    duration: string;
    outcomes: string[];
    prerequisites: string[];
    topicIDs: string[];
    enrolledUsers: string[];
}

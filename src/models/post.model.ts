import { ID } from './types';
import { Accesses, PostCategories } from './enums';

export interface Post {
    id: ID;
    authorID: ID;
    title: string;
    category: PostCategories;
    content: string;
    published: boolean;
    isSeries: boolean;
    likes: number;
    views: number;
    shares: number;
    comments: Comment[];
    access: Accesses;
    postedOn: Date;
    modifiedOn: Date;
}

export interface Comment {
    postID: ID;
    authorID: ID;
    content: string;
    likes: number;
    comments: Comment[];
}

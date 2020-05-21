// Topic can only be created once (no update on its title), and title is unique.
export interface Topic {
    id: string,
    title: string,
    logo: string,
    description: string,
    parentTopic: string,
    likes: number,
    contexts: string[]
}

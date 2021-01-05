import { Users, Cities, States, Countries, Genders, Professions, Orgs, Studies } from './enums';
import { ID } from './types';

export interface User {
    id: ID,
    type: Users,
    email: string,
    username: string,
    password: string,
    photo: string,
    name: string,
    gender: Genders,
    dob: Date,
    phones: string[],
    addresses: Address[],
    professions: Profession[],
    educations: Education[],
    weblinks: WebLink[],
    about: string,
    connections: number,
    nationality: string,
    contexts: UserContext[]
}

export interface UserContext {
    appName: string,
    points: number,
    likes: number,
    views: number,
    followers: number,
    following: number
}

export interface Address {
    addressL1?: string,
    city: Cities,
    state: States,
    country: Countries,
    geolocation?: string,
    isCurrent: boolean
}

export interface Profession {
    title: Professions,
    org: Org,
    from: Date,
    to: Date,
    isCurrent: boolean
}

export interface Education {
    study: Studies,
    org: Org,
    from: Date,
    to: Date,
    certs: Cert[],
    awards: Award[],
    isCurrent: boolean
}

export interface Org {
    id: ID,
    name: string,
    type: Orgs
}

export interface Cert {
    title: string,
    description: string,
    awardedBy: string,
    awardedOn: Date,
    tags: string[]
}

export interface Award {
    title: string,
    description: string,
    eventID: ID,
    awardedBy: string,
    awardedOn: Date,
    tags: string[]
}

export interface WebLink {
    url: string,
    source: string
}

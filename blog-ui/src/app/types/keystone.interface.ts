export interface Post {
    author: User,
    content: PostContent,
    id: string,
    image?: Image,
    publishedAt: Date,
    status: String,
    tags: Tag[],
    tagsCount: number,
    title: string,
}

export interface User {
    avatar: Image,
    username: string,
    createdAt: Date,
    email: String,
    posts: Post[],
    postsCount: number,
}

export interface Image {
    extension: string,
    filesize: number,
    height: number,
    id: number,
    url: string,
    width: number,
}

export interface Tag {
    __typename: string,
    id: string,
    name: string,
    posts: Post[],
    postsCount: number,
}

export interface PostResponse {
    loading: boolean,
    networkStatus: number,
    posts: Post[],
}

export interface TagResponse {
    loading: boolean,
    networkStatus: number,
    tags: Tag[],
}

export interface PostContent {
    document: DocumentContent[]
}

export interface DocumentContent {
    type: string,
    level?: number,
    children: DocumentChild[],
}

export interface DocumentChild {
    text: string,
    code?: boolean,
}

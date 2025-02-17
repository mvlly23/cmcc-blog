import { ApolloClient, InMemoryCache, ApolloProvider, gql, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client';
import { environment } from '../../../environments/environment';
import { Post, PostResponse, Tag, TagResponse } from '../../types/keystone.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class KeystoneService {
    client: ApolloClient<NormalizedCacheObject>;
    constructor() {
        this.client = new ApolloClient({
            uri: environment.APOLLO_CLIENT_GRAPHQL_URI,
            cache: new InMemoryCache()
        });
    }

    getAllPosts() {
        return this.client.query({
            query: gql`
            query Posts {
                posts {
                    id
                    title
                    image {
                    id
                    filesize
                    width
                    height
                    extension
                    url
                    }
                    content {
                    document
                    }
                    author {
                    id
                    name
                    username
                    email
                    password {
                        isSet
                    }
                    posts {
                        id
                        title
                        tagsCount
                        publishedAt
                        status
                    }
                    postsCount
                    createdAt
                    avatar {
                        id
                        filesize
                        width
                        height
                        extension
                        url
                    }
                    }
                    tags {
                    id
                    name
                    postsCount
                    }
                    tagsCount
                    publishedAt
                    status
                }
            }`,
        }).then((result) => { return result });
    }

    getPublishedPosts(): Promise<Post[]> {
        return this.client.query<PostResponse>({
            query: gql`
                query Posts($where: PostWhereInput!) {
                    posts(where: $where) {
                        id
                        title
                        image {
                        id
                        filesize
                        width
                        height
                        extension
                        url
                        }
                        content {
                        document
                        }
                        author {
                        id
                        name
                        username
                        email
                        password {
                            isSet
                        }
                        posts {
                            id
                            title
                            tagsCount
                            publishedAt
                            status
                        }
                        postsCount
                        createdAt
                        avatar {
                            id
                            filesize
                            width
                            height
                            extension
                            url
                        }
                        }
                        tags {
                        id
                        name
                        postsCount
                        }
                        tagsCount
                        publishedAt
                        status
                    }
                }
            `,
            variables: {
                "where": {
                    "status": {
                        "equals": "published",
                    }
                }
            }
        }).then((result: ApolloQueryResult<PostResponse>) => { return result.data.posts; });
    }

    getPostById(id: string) {
        return this.client.query<PostResponse>({
            query: gql`
                query ExampleQuery($where: PostWhereInput!) {
                    posts(where: $where) {
                        id
                        title
                        image {
                        id
                        filesize
                        width
                        height
                        extension
                        url
                        }
                        content {
                        document
                        }
                        author {
                        id
                        name
                        username
                        email
                        password {
                            isSet
                        }
                        posts {
                            id
                            title
                            tagsCount
                            publishedAt
                            status
                        }
                        postsCount
                        createdAt
                        avatar {
                            id
                            filesize
                            width
                            height
                            extension
                            url
                        }
                        }
                        tags {
                        id
                        name
                        postsCount
                        }
                        tagsCount
                        publishedAt
                        status
                    }
                }

            `, variables: {
                "where": {
                    "id": {
                        "equals": id
                    }
                }
            }
        }).then((result: ApolloQueryResult<PostResponse>) => { return result.data.posts; });
    }

    getTags(): Promise<Tag[]> {
        return this.client.query<TagResponse>({
            query: gql`
                query Tags {
                    tags {
                        id
                        name
                        posts {
                        id
                        title
                        image {
                            id
                            filesize
                            width
                            height
                            extension
                            url
                        }
                        content {
                            document
                        }
                        author {
                            id
                            name
                            username
                            email
                            password {
                            isSet
                            }
                            postsCount
                            createdAt
                            avatar {
                            id
                            filesize
                            width
                            height
                            extension
                            url
                            }
                        }
                        tags {
                            id
                            name
                            postsCount
                        }
                        tagsCount
                        publishedAt
                        status
                        }
                        postsCount
                    }
                }
            `
        }).then((response: ApolloQueryResult<TagResponse>) => { return response.data.tags });
    }

    searchPosts(term: string) {
        return this.client.query<PostResponse>({
            query: gql`
                query Posts($where: PostWhereInput!) {
                    posts(where: $where) {
                        id
                        title
                        image {
                        id
                        filesize
                        width
                        height
                        extension
                        url
                        }
                        content {
                        document
                        }
                        author {
                        id
                        name
                        username
                        email
                        password {
                            isSet
                        }
                        posts {
                            id
                            title
                            tagsCount
                            publishedAt
                            status
                        }
                        postsCount
                        createdAt
                        avatar {
                            id
                            filesize
                            width
                            height
                            extension
                            url
                        }
                        }
                        tags {
                        id
                        name
                        postsCount
                        }
                        tagsCount
                        publishedAt
                        status
                    }
                }
            `,
            variables: {
                "where": {
                    "status": {
                        "equals": 'published'
                    },
                    "AND": [
                        {
                            "OR": [
                                {
                                    "title": {
                                        "contains": term
                                    }
                                }, 
                                // {
                                //     "content": {
                                //         "contains": term
                                //     }
                                // }
                            ]
                        }
                    ]
                }
            }
        }).then((result: ApolloQueryResult<PostResponse>) => { return result.data.posts; });
    }
}
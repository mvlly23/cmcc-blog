import { ApolloClient, InMemoryCache, ApolloProvider, gql, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client';
import { environment } from '../../../environments/environment';
import { Post, PostResponse, Tag, TagResponse } from '../../types/keystone.interface';
import { Injectable } from '@angular/core';
import { GET_POSTS_QUERY, GET_TAGS_QUERY } from '../repository/keystone.repository'

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
            query: GET_POSTS_QUERY
        }).then((result) => { return result });
    }

    getPublishedPosts(): Promise<Post[]> {
        return this.client.query<PostResponse>({
            query: GET_POSTS_QUERY,
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
            query: GET_POSTS_QUERY, variables: {
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
            query: GET_TAGS_QUERY
        }).then((response: ApolloQueryResult<TagResponse>) => { return response.data.tags });
    }

    searchPosts(term: string) {
        return this.client.query<PostResponse>({
            query: GET_POSTS_QUERY,
            variables: {
                "where": {
                    "status": {
                        "equals": 'published'
                    },
                    "AND": [{
                        "OR": [{
                            "title": {
                                "contains": term
                            }
                        }]
                    }]
                }
            }
        }).then((result: ApolloQueryResult<PostResponse>) => { return result.data.posts; });
    }
}
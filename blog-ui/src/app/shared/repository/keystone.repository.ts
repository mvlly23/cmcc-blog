import { gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
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
`;

export const GET_TAGS_QUERY = gql`
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
`;
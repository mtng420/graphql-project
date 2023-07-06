const {
    GraphQLSchema,
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = require('graphql');
const _ = require('lodash')

// dummy data
const usersData = [
    { id: '1', name: 'Bond', age: 36, profession: 'Programmer' },
    { id: '13', name: 'Anna', age: 26, profession: 'Baker' },
    { id: '133', name: 'Bella', age: 16, profession: 'Mechanic' },
    { id: '213', name: 'Gina', age: 23, profession: 'Painter' },
    { id: '313', name: 'Georgina', age: 36, profession: 'Teacher' },
]

const hobbyData = [
    { id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '1' },
    { id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts', userId: '13' },
    { id: '3', title: 'Swimming', description: 'Get in the water and learn to becoma the water', userId: '133' },
    { id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '213' },
    { id: '5', title: 'Hiking',  description: 'Wear hiking boots and explore the world', userId: '13' },
]

const postsData = [
    { id: '1', comment: 'Building a Mind', userId: '1'},
    { id: '2', comment: 'GraphQL is Amazing', userId: '1' },
    { id: '3', comment: 'How to Change the world', userId: '133' },
    { id: '4', comment: 'How to Change the world', userId: '213' },
    { id: '5', comment: 'How to Change the world', userId: '1' },
]

/**
 * スキーマを定義
 * GraphQL APIがどのようなデータを提供するか
 * 
 * NOTICE: Sibling とは リレーションシップを持つオブジェクト同士が階層的に入れ子になったGraphQLスキーマ
 */

// Create types
// ユーザーオブジェクトの型を定義
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, { userId: parent.id})
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbyData, { userId: parent.id})
            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
    })
})

// Post type (id, comment)
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
    })
})

// RootQuery
// userフィールドを持ち、id引数を受け取る
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args) {
                return _.find(usersData, { id: args.id });
                // we resolve with data
                // get and return data from a datasource
            }
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(hobbyData, { id: args.id });
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(postsData, { id: args.id });
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        CreateUser: {
            type: UserType,
            args: {
                // id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString }
            },

            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                }
                return user;
            }
        },
        CreatePost: {
            type: PostType,
            args: {
                // id: { type: GraphQLID },
                comment: { type: GraphQLString },
                userId: { type: GraphQLID },
            },

            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId,
                }
                return post;
            }
        },
        CreateHobby: {
            type: HobbyType,
            args: {
                // id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLID },
            },

            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                }
                return hobby;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})

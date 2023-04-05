const {
    GraphQLSchema,
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} = require('graphql');
const _ = require('lodash')

// dummy data
const usersData = [
    { id: '1', name: 'Bond', age: 36 },
    { id: '13', name: 'Anna', age: 26 },
    { id: '133', name: 'Bella', age: 16 },
    { id: '213', name: 'Gina', age: 23 },
    { id: '313', name: 'Georgina', age: 36 },
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})

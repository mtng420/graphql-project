const {
    GraphQLSchema,
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

/**
 * スキーマを定義
 * GraphQL APIがどのようなデータを提供するか
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
// 入力オブジェクトタイプを作成（GraphQLInputObjectTypeの時）
// userフィールドを持ち、id引数を受け取る
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},

            resolve(parent, args) {
                // we resolve with data
                // get and return data from a datasource
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})

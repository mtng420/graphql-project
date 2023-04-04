const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema')

const app = express();

// GraphQL APIエンドポイントを定義
app.use('/graphql', graphqlHTTP({
    graphiql: true, // GraphiQLインターフェースを使用できるようにする
    schema: schema,
}))

app.listen(4000, () => {
    console.log('Listening for requests on my awesome port 4000')
})

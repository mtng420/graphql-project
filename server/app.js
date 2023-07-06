const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema')
const testSchema = require('./schema/types_schema');

const app = express();

// mongodb+srv://jbmatsunaga:<password>@graphqlcluster.nsknhhs.mongodb.net/?retryWrites=true&w=majority

// GraphQL APIエンドポイントを定義
app.use('/graphql', graphqlHTTP({
    graphiql: true, // GraphiQLインターフェースを使用できるようにするyo
    schema: testSchema,
}))

app.listen(4000, () => {
    console.log('Listening for requests on my awesome port 4000')
})

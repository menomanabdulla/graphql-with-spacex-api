const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

const schema = require('./schema');
const port = process.env.PORT || 5000;

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );

app.listen(port, () => console.log(`Example app listening on port ${port}`));
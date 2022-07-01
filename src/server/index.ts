const { graphqlHTTP } = require('express-graphql');
const { connectDB } = require('./config/db');
const schema = require('./schema/schema');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())

require('dotenv').config();
const port = process.env.PORT || 5000;

connectDB();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
}));


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
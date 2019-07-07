const axios = require('axios');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} = graphql;

// test
const users = [
    { email: 'test@test.com', firstName: 'Josh', id: '1', lastName: 'Williams' },
    { email: 'test2@test.com', firstName: 'Eric', id: '2', lastName: 'James' }
];

const UserType = new GraphQLObjectType({
    fields: {
        email: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        }
    },
    name: 'User'
});

const RootQuery = new GraphQLObjectType({
    fields: {
        user: {
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                // return users.find(user => args.id === user.id);
                return axios.get(`http://localhost:3001/users/${args.id}`)
                    .then(response => response.data);
            },
            type: UserType
        }
    },
    name: 'RootQueryType'
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

const axios = require('axios');

//Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields:() => ({
        id: { type: GraphQLString },
        flight_number: { type: GraphQLInt},
        name: { type: GraphQLString },
        details: { type: GraphQLString },
        date_local: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        rocket: { type: GraphQLString }
    })
})

//Rocket Type

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields:() => ({
        id: { type: GraphQLString },
        country: { type: GraphQLString},
        name: { type: GraphQLString },
        type: { type: GraphQLString },
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        launches:{
            type: new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v4/launches/past')
                    .then(res => res.data)
            }
        },
        rocket:{
            type: RocketType,
            args:{
                id: { type: GraphQLString }
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
                    .then(res => res.data)
            }
        },
        launch:{
            type: LaunchType,
            args:{
                id: { type: GraphQLString }
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v4/launches/${args.id}`)
                .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
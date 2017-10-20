import {
    GraphQLObjectType,
    GraphQLInt, 
    GraphQLString,
    GraphQLList,
    GraphQLSchema
} from 'graphql';

import Db from './db';

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This is a person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person) {
                    return person.id;
                }
            },
            firstName: {
                type: GraphQLString, 
                resolve(person) {
                    return person.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(person) {
                    return person.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(person) {
                    return person.email;
                }
            },
            sessions: {
                type: new GraphQLList(Session),
                resolve(person) {
                    console.log(person.id);
                    return person.getSessions();
                }
            }
        }
    }
});


const Session = new GraphQLObjectType({
    name: 'Session',
    description: 'A session from person and an AI',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(sess) {
                    return sess.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(sess) {
                    return sess.title;
                }
            },
            content: {
                type: GraphQLString,
                resolve(sess) {
                    return sess.content;
                }
            }, 
            person: {
                type: Person,
                resolve(sess) {
                    return sess.getPerson();
                }
            },
            messages: {
                type: new GraphQLList(Message),
                resolve(sess) {
                    return sess.getMessages();
                    // return Db.models.message.findAll({where: { sessionId: sess.id }});
                }
            }
        }
    }
});

const Message = new GraphQLObjectType({
    name: 'Message',
    description: 'A message from person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(msg) {
                    return msg.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(msg) {
                    return msg.title;
                }
            },
            content: {
                type: GraphQLString,
                resolve(msg) {
                    return msg.content;
                }
            }, 
            session: {
                type: Session,
                resolv(msg) {
                    return msg.getSession();
                }
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is the root Query',
    fields: () => {
        return {
            people: {
                type: new GraphQLList(Person),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.person.findAll({where: args});
                }
            },
            sessions: {
                type: new GraphQLList(Session),
                resolve(root, args) {
                    return Db.models.session.findAll({where: args});
                }
            },
            messages: {
                type: new GraphQLList(Message),
                resolve(root, args) {
                    return Db.models.message.findAll({where: args});
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query
});

export default Schema;

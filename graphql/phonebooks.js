const { buildSchema } = require('graphql');
const { getPhonebooks, createPhonebook, updatePhonebook, getPhonebook, deletePhonebook } = require('../services/phonebooks');
const path = require('path');
const fs = require('fs')

const schema = buildSchema(`
    type Phonebook {
        _id: ID!
        name: String!
        phone: String!
        avatar: String
    }

    type Phonebooks {
        phonebooks: [Phonebook]
        page: Int
        limit: Int
        pages: Int
        total: Int        
    }

    input PhonebookInput {
        name: String!
        phone: String!
    }

    type Query {
        getPhonebooks(page: Int, limit: Int, keyword: String, sort: String): Phonebooks
    }

    type Mutation {
        createPhonebook(input: PhonebookInput): Phonebook
        updatePhonebook(_id: ID!, input: PhonebookInput): Phonebook
        deletePhonebook(_id: ID!): Phonebook
    }

`)

const solution = {
    getPhonebooks: ({ page = 1, limit = 60, keyword = '', sort = 'asc' }) => getPhonebooks({ page, limit, keyword, sort }),

    createPhonebook: ({ input }) => createPhonebook(input),

    updatePhonebook: ({ _id, input }) => updatePhonebook(_id, input),

    deletePhonebook: ({ _id }) => deletePhonebook(_id)
}

module.exports = { schema, solution }
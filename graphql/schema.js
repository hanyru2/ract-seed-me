import { makeExecutableSchema } from 'graphql-tools'
import 'isomorphic-fetch'

// import { format as formatDate } from 'date-fns'

import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
  type Query {
    categories: [CategoryType]
    cate_menus(cate_id: Int): CategoryType
    menu_item(menu_id: Int!): MenuType
  }
  type CategoryType {
    id: Int
    name: String
    images: String
    menus: [MenuType]
  }
  type MenuType {
    id: Int
    categoryId: Int
    name: String
    images: String
    price: Int
    rating: RatingType
    comments: [CommentType]
  }
  type RatingType {
    one: Int
    two: Int
    three: Int
    four: Int
    five: Int
  }
  type Mutation {
    add_comment(body:String!,menuId:Int!): CommentType
  }
  type CommentType {
    id: Int
    body: String
    menuId: Int
  }
  
`

const resolvers = {
  Query: {
    categories: async () => {
      const { data } = await fetchAPI(`/categories`)
      return data
    },
    cate_menus: async (_, { cate_id }) => {
      const { data } = await fetchAPI(`/categories/${cate_id}?_embed=menus`)
      return data
    },
    menu_item: async (_, { menu_id }) => {
      const { data } = await fetchAPI(`/menus/${menu_id}?_embed=comments`)
      return data
    }
  },
  Mutation: {
    add_comment: async (_, { body, menuId }) => {
      const res = await fetch(`http://localhost:4000/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body,
          menuId
        })
      })
      const json = await res.json()
      return json
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

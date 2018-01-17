import React from 'react'

import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Link } from '../routes'
import NavStyles from './NavStyles'


function Nav({ data }) {
  const { categories } = data

  return (
    <nav>
      {categories.map(function (cate) {
        return (
          <Link key={cate.id} route="category" params={{ id: cate.id }}>
            <a>{cate.name}</a>
          </Link>
        )
      })}
      <style jsx>{NavStyles}</style>
    </nav>
  )
}

const QUERY_MENU = gql`
  query{
    categories {
      id
      name
    }
  }
`

export default compose(
  graphql(QUERY_MENU, {
    options: () => ({
      variables: {

      }
    })
  })
)(Nav)

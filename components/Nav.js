import React from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { Link } from '../routes'

import withStoreData from '../hocs/withStoreData'

import NotisMessage from '../pages/NotisMessage'

import NavStyles from './NavStyles'

function Nav({ data, notis }) {

  const { categories } = data

  return (
    <nav>
      {notis.length > 0 && <NotisMessage notis={notis} />}
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

function stateSelector(state) {
  return ({
    notis: state.notis
  })
}

export default compose(
  withStoreData,
  connect(stateSelector),
  graphql(QUERY_MENU)
)(Nav)

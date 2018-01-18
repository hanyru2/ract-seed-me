import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import page from '../hocs/page'

import MainStyle from './MainStyle'

function HomePage({ data }) {
  const { all_menus } = data
  return (
    <div>
      <Head>
        <title>React Suki</title>
      </Head>
      <div className="item__img__box">
        <img className="index__img" src="/static/images/view-our-menu.svg" />
      </div>
      <div className="site-section__body row">
        {all_menus.map(function (menu) {
          const img_src = "/static/images/menus/" + menu.images
          return (
            <div key={menu.id} className="img__index">
              <img src={img_src} />
            </div>
          )
        })}
      </div>
      <style jsx>{MainStyle}</style>
    </div>
  )
}

const QUERY_MENU = gql`
  query{
    all_menus {
      id
      images
    }
  }
`

export default compose(
  page,
  graphql(QUERY_MENU)
)(HomePage)
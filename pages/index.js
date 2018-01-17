import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'

import withPreloader from '../hocs/withPreloader'
import page from '../hocs/page'
// import { Link } from '../routes'

import MainStyle from './MainStyle'

function HomePage() {
  return (
    <div>
      <Head>
        <title>React Suki</title>
      </Head>
      <div className="item__img__box">
        <img className="index__img" src="/static/images/view-our-menu.svg" />
      </div>
      <style jsx>{MainStyle}</style>
    </div>
  )
}

export default compose(
  page
)(HomePage)
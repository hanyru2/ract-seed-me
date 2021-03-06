import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import withPreloader from '../hocs/withPreloader'
import withStoreData from '../hocs/withStoreData'

import addNotis from './addNotis'

import calculateRating from '../utils/calculateRating'

import MainStyle from './MainStyle'

function EntryPage({ data, text_comment, handleAddOrder, handleAddComment, handleCommentChanged, handleRatting }) {

  const { menu_item } = data
  
  const img_src = "/static/images/menus/" + menu_item.images
  const rating = calculateRating(menu_item.rating)

  return (
    <div>
      <Head>
        <title>{menu_item.name}</title>
      </Head>
      <div className="suki__item">
        <div className="categories__item">
          <div className="item__img__box">
            <img className="item__img" src={img_src} />
          </div>
          <div className="item__detail">
            <h3>{menu_item.name}</h3>
            <h3>{menu_item.price}.-</h3>
            <div className="ratings">
              <div className="empty-stars"></div>
              <div className="full-stars"></div>
            </div>
            <div className="font__rating">
              <span>({rating.all_rating} Ratings) ( {rating.rating_score} / {rating.rating_score_top} => {rating.rating_percentage}% )</span>
            </div>
            <br /><br />
            <button className="btn__add__order" value={menu_item.id} onClick={handleAddOrder.bind(this)}>Add Order</button>
            <br /><br />
            <textarea onChange={handleCommentChanged.bind(this)} value={text_comment}></textarea>
            <button className="btn__add__comment" value={menu_item.id} onClick={handleAddComment.bind(this)}>Add Comment</button>
            <br /><br />
            {/* <div>
              <span>Set Rating : </span>
              <button onClick={handleRatting.bind(this)} value="one">1</button><button onClick={handleRatting.bind(this)} value="two">2</button><button onClick={handleRatting.bind(this)} value="three">3</button><button onClick={handleRatting.bind(this)} value="four">4</button><button onClick={handleRatting.bind(this)} value="five">5</button>
            </div> */}
          </div>
        </div>
        <div className="menu__order">
          <div className="menu__order__title">
            <h3>Reviews</h3>
          </div>
          <div className="menu__comment__detail">
            {menu_item.comments.map(function (comment) {
              return (
                <p key={comment.id}>{comment.body}</p>
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{MainStyle}</style>
      <style jsx>{`        
        .full-stars{
          width: ${rating.rating_percentage}%;
        }
      `}</style>
    </div >
  )
}

class entryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddOrder = this.handleAddOrder.bind(this)
    this.handleAddComment = this.handleAddComment.bind(this)
    this.handleCommentChanged = this.handleCommentChanged.bind(this)
    this.handleRatting = this.handleRatting.bind(this)

    this.state = {
      text_comment: ''
    }
  }

  handleAddOrder() {
    const menu = this.props.data.menu_item

    this.props.dispatch({
      type: 'ADD_ORDER',
      data: {
        id: new Date().getTime(),
        menuId: menu.id,
        name: menu.name,
        price: menu.price,
        amount: 1
      }
    })

    const message = "Add ( \" " + menu.name + " \" ) in order completed."
    addNotis(this.props, message)
  }

  handleCommentChanged(event) {
    event.preventDefault()
    const input_text = event.target.value;
    this.setState({
      text_comment: input_text
    })
  }

  handleAddComment(event) {
    event.preventDefault()

    const body = this.state.text_comment

    if (body == "") {
      const message = "Please insert comment."
      addNotis(this.props, message)
    }
    else {
      const menuId = event.target.value

      this.props.client.mutate({
        mutation: ADD_COMMENT,
        variables: {
          body,
          menuId
        },
        update: (proxy, { data: { add_comment } }) => {
          const data_item = proxy.readQuery({
            query: QUERY_ITEM,
            variables: {
              menu_id: menuId
            }
          })
          data_item.menu_item.comments.push(add_comment)
          proxy.writeQuery({
            query: QUERY_ITEM,
            data: data_item
          })
        },
      })

      const message = "Add comment completed."
      addNotis(this.props, message)

      window.scrollTo(0, 0)
    }

    this.setState({
      text_comment: ''
    })
  }

  handleRatting(event) {
    const rating = event.target.value
    const menu_id = this.props.data.menu_item.id

    console.log("menu_id :", menu_id)
    console.log("rating :", rating)

  }

  render() {
    return (
      <EntryPage
        data={this.props.data}
        text_comment={this.state.text_comment}
        handleAddOrder={this.handleAddOrder}
        handleAddComment={this.handleAddComment}
        handleCommentChanged={this.handleCommentChanged}
        handleRatting={this.handleRatting}
      />
    )
  }
}

const QUERY_ITEM = gql`
  query menu_item($menu_id: Int!) {
          menu_item(menu_id: $menu_id) {
          id
      name
        images
      price
      rating {
          one
        two
        three
        four
        five
      }
      comments {
          id
        body
        }
    }
  }
`

const ADD_COMMENT = gql`
  mutation($body: String!, $menuId: Int!) {
          add_comment(body: $body, menuId: $menuId) {
          id
       body
        menuId
    }
  }
`

function stateSelector(state) {
  return ({
    orders: state.orders
  })
}

export default compose(
  page,
  withApollo,
  withStoreData,
  connect(stateSelector),
  graphql(QUERY_ITEM, {
    options: ({ url: { query: { id } } }) => ({
      variables: {
        menu_id: id
      }
    })
  }),
  withPreloader
)(entryContainer)
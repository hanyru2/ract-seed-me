import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import withPreloader from '../hocs/withPreloader'
import page from '../hocs/page'
import { Link } from '../routes'

import { Router } from '../routes'

import OrderList from './OrderList'
import NotisMessage from './NotisMessage'
import MainStyle from './MainStyle'

function CategoryPage({ data, notis, handleAddOrder, handleRemoveOrder, handleOrderNow, handleCheckbill }) {
    const { cate_menus } = data

    return (
        <div>
            <Head>
                <title>React Suki</title>
            </Head>
            {notis.length > 0 && <NotisMessage notis={notis} />}
            <div className="suki__item">
                <div className="categories__item">
                    {cate_menus.menus.map(function (menu) {
                        const img_src = "/static/images/menus/" + menu.images

                        return (
                            <div key={menu.id} className="menu__item">
                                <Link route="entry" params={{ id: menu.id }}>
                                    <a>
                                        <img className="menu__images" src={img_src} />
                                        <p>{menu.name}</p>
                                    </a>
                                </Link>
                                <p>{menu.price}.-</p>
                                <button className="btn__add__order" value={menu.id} onClick={handleAddOrder.bind(this)}>Add Order</button>
                            </div>
                        )
                    })}
                </div>
                <div className="menu__order">
                    <div className="menu__order__title">
                        <h3>My Orders</h3>
                    </div>
                    <div className="menu__order__btn">
                        <button className="btn__order__now" onClick={handleOrderNow.bind(this)}>Order Now</button>
                        <button className="btn__check__bill" onClick={handleCheckbill.bind(this)}>Check Bill</button>
                    </div>
                    <OrderList
                        handleRemoveOrder={handleRemoveOrder} />
                </div>
            </div>
            <style jsx>{MainStyle}</style>
        </div>
    )
}

const QUERY_MENU = gql`
  query($cate_id: Int!) {
    cate_menus(cate_id: $cate_id) {
        id
      name
      images
      menus {
        id
        name
      images
        price
      }
    }
  }
`

class categoryContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOrder = this.handleAddOrder.bind(this)
        this.handleRemoveOrder = this.handleRemoveOrder.bind(this)
        this.handleOrderNow = this.handleOrderNow.bind(this)
        this.handleCheckbill = this.handleCheckbill.bind(this)
    }

    handleAddOrder(event) {
        const all_menu = this.props.data.cate_menus.menus;
        const select_menu = all_menu.filter(function (menu) {
            if (menu.id == event.target.value) {
                return menu
            }

            return false
        })

        if (select_menu.length != 0) {
            this.props.dispatch({
                type: 'ADD_ORDER',
                data: {
                    id: new Date().getTime(),
                    menuId: select_menu[0].id,
                    name: select_menu[0].name,
                    price: select_menu[0].price,
                    amount: 1
                }
            })

            this.props.dispatch({
                type: 'CLEAR_ALL_NOTIS'
            })
        }
    }

    handleRemoveOrder(event) {
        const order_id = event.target.value

        this.props.dispatch({
            type: 'REMOVE_ORDER',
            data: {
                id: order_id
            }
        })
    }

    handleOrderNow(event) {
        const allOrders = this.props.allOrders
        const orders = this.props.orders

        // With route name and params
        /* Router.pushRoute('blog', { slug: 'hello-world' }) */
        // With route URL
        if (allOrders.length > 0 || orders.length > 0) {
            if (orders.length > 0) {
                orders.map(function (order) {
                    this.props.dispatch({
                        type: 'ADD_ALL_ORDER',
                        data: {
                            id: order.id,
                            menuId: order.menuId,
                            name: order.name,
                            price: order.price,
                            amount: order.amount
                        }
                    })
                }.bind(this))

                this.props.dispatch({
                    type: 'CLEAR_ORDER'
                })
            }

            Router.pushRoute('/order')
            window.scrollTo(0, 0)
        }
        else {
            this.props.dispatch({
                type: 'ADD_NOTI',
                notis: [
                    {
                        message: "Please add order."
                    }
                ]
            })

            setTimeout(function () {
                this.props.dispatch({
                    type: 'CLEAR_ALL_NOTIS'
                })
            }.bind(this), 1000)
        }
    }

    handleCheckbill(event) {
        const allOrders = this.props.allOrders
        const orders = this.props.orders

        if (allOrders.length > 0 || orders.length > 0) {
            if (orders.length > 0) {
                orders.map(function (order) {
                    this.props.dispatch({
                        type: 'ADD_ALL_ORDER',
                        data: {
                            id: order.id,
                            menuId: order.menuId,
                            name: order.name,
                            price: order.price,
                            amount: order.amount
                        }
                    })
                }.bind(this))

                this.props.dispatch({
                    type: 'CLEAR_ORDER'
                })
            }

            Router.pushRoute('/checkbill')
            window.scrollTo(0, 0)
        }
        else {
            this.props.dispatch({
                type: 'ADD_NOTI',
                notis: [
                    {
                        message: "Please add order."
                    }
                ]
            })

            setTimeout(function () {
                this.props.dispatch({
                    type: 'CLEAR_ALL_NOTIS'
                })
            }.bind(this), 1000)
        }
    }

    render() {
        return (
            <CategoryPage
                data={this.props.data}
                notis={this.props.notis}
                handleAddOrder={this.handleAddOrder}
                handleRemoveOrder={this.handleRemoveOrder}
                handleOrderNow={this.handleOrderNow}
                handleCheckbill={this.handleCheckbill}
            />
        )
    }
}

function stateSelector(state) {
    return ({
        allOrders: state.allOrders,
        orders: state.orders,
        notis: state.notis
    })
}

export default compose(
    page,
    connect(stateSelector),
    graphql(QUERY_MENU, {
        options: ({ url: { query: { id } } }) => ({
            variables: {
                cate_id: id
            }
        })
    }),
    withPreloader
)(categoryContainer)

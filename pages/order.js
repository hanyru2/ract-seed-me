import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import page from '../hocs/page'
import { Link } from '../routes'
import { Router } from '../routes'

import NotisMessage from './NotisMessage'
import manageOrderItems from '../utils/manageOrderItems'

import MainStyle from './MainStyle'

function OrderPage({ allOrders, notis, handleCheckbill }) {

    var number = 0

    const items = manageOrderItems(allOrders)

    return (
        <div>
            <Head>
                <title>React Suki</title>
            </Head>
            {notis.length > 0 && <NotisMessage notis={notis} />}
            <div className="order__all">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price/Quantity (SUM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.orders.map(function (order) {
                            number = number + 1
                            return (
                                <tr key={order.id}>
                                    <td className="center order__list__number td__order">{number}.</td>
                                    <td className="order__list__name td__order">{order.name}</td>
                                    <td className="center order__list__number td__order">{order.amount}</td>
                                    <td className="center order__list__number td__order">{order.price} ({order.sumprice})</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="3" className="center right td__sum">Total</td>
                            <td className="center td__sum">{items.allPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="menu__order__btn center">
                <Link route="category" params={{ id: 1 }}>
                    <button className="">Back</button>
                </Link>
                <button onClick={handleCheckbill.bind(this)} className="">Check Bill</button>
            </div>
            <style jsx>{MainStyle}</style>
        </div >
    )
}

class orderContainer extends React.Component {
    constructor(props) {
        super(props)

        this.handleCheckbill = this.handleCheckbill.bind(this)
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
            }

            Router.pushRoute('/checkbill')
            window.scrollTo(0, 0)
        }
        else {
            this.props.dispatch({
                type: 'ADD_NOTI',
                notis: [
                    {
                        message: "No order(s) to check bill."
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
            <OrderPage
                allOrders={this.props.allOrders}
                notis={this.props.notis}
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
)(orderContainer)
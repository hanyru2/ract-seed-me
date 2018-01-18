import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { Router } from '../routes'
import page from '../hocs/page'
import withStoreData from '../hocs/withStoreData'

import manageOrderItems from '../utils/manageOrderItems'
import addNotis from './addNotis'

import MainStyle from './MainStyle'


function OrderPage({ allOrders, handleCheckbill }) {

    let number = 0
    const items = manageOrderItems(allOrders)

    return (
        <div>
            <Head>
                <title>React Suki</title>
            </Head>
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
                <button onClick={(e) => { window.history.back() }} className="">Back</button>
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

        if (allOrders.length > 0) {
            this.props.dispatch({
                type: 'CLEAR_ORDER'
            })

            Router.pushRoute('/checkbill')
            window.scrollTo(0, 0)
        }
        else {
            const message = "No order(s) to check bill."
            addNotis(this.props, message)
        }
    }

    render() {
        return (
            <OrderPage
                allOrders={this.props.allOrders}
                handleCheckbill={this.handleCheckbill}
            />
        )
    }
}

function stateSelector(state) {
    return ({
        allOrders: state.allOrders,
        orders: state.orders
    })
}

export default compose(
    page,
    withStoreData,
    connect(stateSelector),
)(orderContainer)
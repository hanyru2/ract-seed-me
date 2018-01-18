import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import page from '../hocs/page'
import withStoreData from '../hocs/withStoreData'
import { Router } from '../routes'

import MainStyle from './MainStyle'

function CheckbillPage({ allOrders, handleClose }) {

    let totalPrice = 0;
    const totalOrder = allOrders.length;

    if (allOrders.length > 0) {
        allOrders.map(function (order) {
            totalPrice += order.price
        })
    }

    return (
        <div>
            <Head>
                <title>React Suki</title>
            </Head>
            <div className="center checkbill__container">
                <div className="vertical-middle">
                    <table>
                        <tbody>
                            <tr>
                                <td>Number of Orders</td>
                                <td className="checkbill__number">{totalOrder}</td>
                            </tr>
                            <tr>
                                <td>Total Price</td>
                                <td className="checkbill__number">{totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
            <div className="menu__order__btn center">
                <button onClick={handleClose.bind(this)} className="">Close</button>
            </div>
            <style jsx>{MainStyle}</style>
        </div >
    )
}

class checkbillContainer extends React.Component {
    constructor(props) {
        super(props)

        this.handleClose = this.handleClose.bind(this)
        this.allOrders = this.props.allOrders

        this.props.dispatch({
            type: 'CLEAR_ALL_ORDER'
        })
    }

    handleClose(event) {

        this.props.dispatch({
            type: 'CLEAR_ALL_ORDER'
        })

        Router.pushRoute('/')
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <CheckbillPage
                allOrders={this.allOrders}
                handleClose={this.handleClose}
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
)(checkbillContainer)
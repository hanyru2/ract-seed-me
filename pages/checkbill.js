import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import page from '../hocs/page'
import store from '../redux/store/SukiStore'
import { Link } from '../routes'

import MainStyle from './MainStyle'

function CheckbillPage() {

    const allOrders = store.getState().allOrders
    var totalPrice = 0;
    const totalOrder = allOrders.length;

    if (allOrders.length > 0) {
        allOrders.map(function (order) {
            totalPrice += order.price
        })
    }

    store.dispatch({
        type: 'CLEAR_ALL_ORDER'
    })

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
                <Link route="home">
                    <button className="">Close</button>
                </Link>
            </div>
            <style jsx>{MainStyle}</style>
        </div >
    )
}

class checkbillContainer extends React.Component {
    constructor(props) {
        super(props)

        const orders = store.getState().orders

        if (orders.length > 0) {
            orders.map(function (order) {
                store.dispatch({
                    type: 'ADD_ALL_ORDER',
                    data: {
                        id: order.id,
                        menuId: order.menuId,
                        name: order.name,
                        price: order.price,
                        amount: order.amount
                    }
                })
            })

            store.dispatch({
                type: 'CLEAR_ORDER'
            })
        }
    }

    render() {
        return (
            <CheckbillPage />
        )
    }
}

export default compose(
    page
)(checkbillContainer)
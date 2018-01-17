import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import page from '../hocs/page'
import store from '../redux/store/SukiStore'
import { Link } from '../routes'

import manageOrderItems from '../utils/manageOrderItems'

import MainStyle from './MainStyle'

function OrderPage() {

    const allOrders = store.getState().allOrders
    var number = 0

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
                <Link route="category" params={{ id: 1 }}>
                    <button className="">Back</button>
                </Link>
                <Link route="checkbill">
                    <button className="">Check Bill</button>
                </Link>
            </div>
            <style jsx>{MainStyle}</style>
        </div >
    )
}

class orderContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <OrderPage />
        )
    }
}

export default compose(
    page
)(orderContainer)
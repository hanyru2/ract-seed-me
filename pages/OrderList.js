import React from 'react'

import MainStyle from './MainStyle'

export default function orderList({ orders, handleRemoveOrder }) {
    return (
        <div className="menu__order__detail">
            {orders.map(function (order) {
                return (
                    <div key={order.id} className="order__menu">
                        <span className="order__name">{order.name}</span>
                        <span className="order__amount">{order.amount}</span>
                        <button className="roder__remove__btn" value={order.id} onClick={handleRemoveOrder.bind(this)}>X</button>
                    </div>
                )
            })}
            <style jsx>{MainStyle}</style>
        </div>
    )
}

export default function manageOrderItems(allOrders) {

    let items_name = Array()
    let orders = Array()
    let num = 0
    let allPrice = 0

    for (let i = 0; i < allOrders.length; i++) {
        allPrice += allOrders[i].price
        if (items_name.indexOf(allOrders[i].name) == -1) {
            orders[num] = {}
            items_name[num] = allOrders[i].name
            orders[num].id = allOrders[i].id
            orders[num].name = allOrders[i].name
            orders[num].price = allOrders[i].price
            orders[num].amount = 0
            orders[num].sumprice = 0
            num++
        }
    }

    for (let j = 0; j < orders.length; j++) {
        for (let k = 0; k < allOrders.length; k++) {
            if (orders[j].name == allOrders[k].name) {
                orders[j].amount += allOrders[k].amount
                orders[j].sumprice += allOrders[k].price
            }
        }
    }

    return ({
        orders,
        allPrice
    })
}
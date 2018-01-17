const emptyList = []

export default function allOrderUpdater(state = emptyList, action) {
    const { type, data } = action

    switch (type) {
        case 'ADD_ALL_ORDER':
            return state.concat(
                {
                    id: data.id,
                    menuId: data.menuId,
                    name: data.name,
                    price: data.price,
                    amount: data.amount
                }
            )

        case 'CLEAR_ALL_ORDER':
            return emptyList

        default:
            return state
    }
}

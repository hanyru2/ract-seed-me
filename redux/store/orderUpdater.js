const emptyList = []

export default function orderUpdater(state = emptyList, action) {
  const { type, data } = action

  switch (type) {
    case 'ADD_ORDER':
      return state.concat(
        {
          id: data.id,
          menuId: data.menuId,
          name: data.name,
          price: data.price,
          amount: 1
        }
      )

    case 'REMOVE_ORDER':
      return state.filter(function (order) {
        return order.id != data.id
      })

    case 'CLEAR_ORDER':
      return emptyList

    default:
      return state
  }
}

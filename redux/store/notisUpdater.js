const emptyList = []

export default function notisUpdater(state = emptyList, action) {
  const { type, notis } = action

  if (action.loading !== undefined) {
    return action.loading === true
      ? [
        {
          message: 'Loading..............'
        }
      ]
      : emptyList
  }

  switch (type) {
    case 'ADD_NOTI':
      return state.concat(notis)

      case 'CLEAR_NOTIS':
      return state.filter(function(data){
        return data.id !== notis[0].id
      })

    case 'CLEAR_ALL_NOTIS':
      return emptyList

    default:
      return state
  }
}

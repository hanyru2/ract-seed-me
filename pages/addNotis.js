export default function addNotis(store, message = "", remove_noti = true) {
    store.dispatch({
        type: 'ADD_NOTI',
        notis: [
            {
                message: message
            }
        ]
    })

    if (remove_noti) {
        setTimeout(function () {
            store.dispatch({
                type: 'CLEAR_ALL_NOTIS'
            })
        }, 1000)
    }
}
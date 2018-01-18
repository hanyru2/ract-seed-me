export default function addNotis(store, message = "", remove_noti = true) {
    const id = new Date().getTime()

    store.dispatch({
        type: 'ADD_NOTI',
        notis: [
            {
                id: id,
                message: message
            }
        ]
    })

    if (remove_noti) {
        setTimeout(function () {
            store.dispatch({
                type: 'CLEAR_NOTIS',
                notis: [
                    {
                        id: id
                    }
                ]
            })
        }, 1000)
    }
}
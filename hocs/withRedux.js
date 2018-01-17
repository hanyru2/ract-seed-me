import React from 'react'
import { Provider, connect } from 'react-redux'
import store from '../redux/store/SukiStore'

export default WrappedComponent =>
    class WithRedux extends React.Component {
        static async getInitialProps(context) {
            const ConnectedordersContainer = connect(state => ({
                orders: state.orders,
                allOrders: state.allOrders,
                bill: store.billUpdater,
                notis: store.notisUpdater
            }))

            return (
                ConnectedordersContainer
            )
        }

        render() {
            return (
                <Provider store={store}>
                    <WrappedComponent {...this.props} />
                </Provider>
            )
        }
    }

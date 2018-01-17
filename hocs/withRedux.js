import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store/SukiStore'

export default WrappedComponent =>
    class WithRedux extends React.Component {
        render() {
            return (
                <Provider store={store}>
                    <WrappedComponent {...this.props} />
                </Provider>
            )
        }
    }

import {
  createStore,
  combineReducers as combineStateUpdater,
  applyMiddleware
} from 'redux'

import apiFetcher from '../middlewares/apiFetcher'
import logger from '../middlewares/logger'

import orderUpdater from './orderUpdater'
import allOrderUpdater from './allOrderUpdater'

import notisUpdater from './notisUpdater'

const rootStateUpdater = combineStateUpdater({
  orders: orderUpdater,
  allOrders: allOrderUpdater,
  notis: notisUpdater
})

const enhancer = applyMiddleware(apiFetcher, logger)
const store = createStore(rootStateUpdater, enhancer)

export default store

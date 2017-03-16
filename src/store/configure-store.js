import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import contacts from '../reducers/contacts'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const root = combineReducers({
  contacts
})

const createStoreWithMiddleware = applyMiddleware(
  logger(),
  thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(
  root,
  undefined,
  autoRehydrate()
)
persistStore(store, {storage: AsyncStorage})

export default store


import React from 'react'
import {Provider} from 'react-redux'
import store from './store/configure-store'
import Main from './containters/Main'

export default () => (
  <Provider store={ store }>
    <Main/>
  </Provider>
)

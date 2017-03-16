import {GET_CONTACTS, FILTER_TYPING} from '../actions'

const initState = {
  records: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      const contacts = action.payload.contacts
      return {
        ...state,
        records: [...contacts]
      }
    case FILTER_TYPING:
      return {
        ...state,
        filterText: action.payload
      }

    default:
      return state
  }
}

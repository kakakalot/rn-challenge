import Contacts from 'react-native-contacts'

export const GET_CONTACTS = 'GET_CONTACTS'
export const FILTER_TYPING = 'FILTER_TYPING'

export const getContacts = () => (dispatch) => {
  Contacts.getAll((err, contacts) => {
    if (err) {
      console.log(err)
    } else {
      dispatch({
        type: GET_CONTACTS,
        payload: {contacts: [...contacts]}
      })
    }
  })
}

export const filterTyping = (text) => ({
  type: FILTER_TYPING,
  payload: text
})

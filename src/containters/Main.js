import {connect} from 'react-redux'
import {ListView} from 'react-native'
import {compose, lifecycle} from 'recompose'
import Main from '../components/Main'
import {getContacts, filterTyping} from '../actions'
import {isEmpty} from 'lodash'

const getSectionData = (dataBlob, sectionID) => {
  return dataBlob[sectionID]
}
const getRowData = (dataBlob, sectionID, rowID) => {
  return dataBlob[sectionID + ':' + rowID]
}

const transferContacts = (contacts, sections, rows) => {
  let newContacts = {}
  contacts.forEach(c => {
    let name = c.givenName.toUpperCase()
    let rowKey = `${name.charAt(0)}:${c.recordID}`
    if (sections.indexOf(name) < 0) {
      sections.push(name.charAt(0))
    }

    newContacts = {...newContacts, [rowKey]: c}
  })

  sections.forEach(s => {
    let rowFilter = [...contacts].filter(c => c.givenName.toUpperCase().charAt(0) === s).map(c => c.recordID)
    rows.push(rowFilter)
    newContacts = {...newContacts, [s]: s}
  })

  return newContacts
}

const mapStateToProps = (state) => {
  const contacts = state.contacts
  const filterText = state.contacts.filterText
  const ds = new ListView.DataSource({
    getSectionData,
    getRowData,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    rowHasChanged: (r1, r2) => r1 !== r2
  })

  const sections = []
  const rows = []
  if (isEmpty(filterText)) {
    const data = transferContacts(contacts.records, sections, rows)
    return {
      //dataSource: ds.cloneWithRows(contacts.records),
      dataSource: ds.cloneWithRowsAndSections(data, sections, rows),
      filterText
    }
  } else {
    const records = [...contacts.records].filter(r => {
      return r.givenName.toLowerCase().indexOf(filterText.toLowerCase()) > -1
    })
    const data = transferContacts(records, sections, rows)

    return {
      dataSource: ds.cloneWithRowsAndSections(data, sections, rows),
      filterText
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  getContacts: () => dispatch(getContacts()),
  filterTyping: (text) => dispatch(filterTyping(text))
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ), lifecycle({
    componentDidMount() {
      this.props.getContacts()
    }
  })
)(Main)

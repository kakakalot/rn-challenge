import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TextInput
} from 'react-native'

const renderRow = (record) => (
  <Text style={ styles.text }>{ record.givenName }</Text>
)

const renderSectionHeader = (record) => (
  <Text style={ styles.section }>{ record }</Text>
)

const ContactsList = ({dataSource}) => (
  <ListView
    style={ styles.container }
    dataSource={ dataSource }
    renderRow={ record => renderRow(record) }
    renderSectionHeader = { section => renderSectionHeader(section) }
  />
)

const Main = (props) => (
  <View>
    <TextInput
      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(text) => props.filterTyping(text)}
      value={props.filterText}
    />
    <ContactsList {...props} />
  </View>
)

export default Main

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF'
  },
  container: {
    paddingTop: 20
  },
  record: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  text: {
    backgroundColor: '#00695c',
    color: 'white'
  }
})

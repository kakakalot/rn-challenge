import React from 'react'
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  Easing
} from 'react-native'

class AnimationView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squareY: new Animated.Value(0),
      squareX: new Animated.Value(0),
      rotation: new Animated.Value(0),
      color: new Animated.Value(0)
    }

    this.width = Dimensions.get('window').width
    this.height = Dimensions.get('window').height
  }

  componentDidMount() {
    Animated.sequence([
      Animated.delay(1500),
      Animated.timing(                            // Animate over time
        this.state.squareY,                      // The animated value to drive
        {
          toValue: 200
        }
      ),
      Animated.parallel([
        Animated.timing(
          this.state.squareX,
          {
            toValue: 300,
            duration: 3000
          }
        ),
        Animated.timing(
          this.state.rotation,
          {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear
          }
        ),
        Animated.timing(
          this.state.color,
          {
            toValue: 150,
            duration: 3000,
            easing: Easing.linear
          }
        )
      ])
    ]).start()
  }

  render() {
    return (
      <View
        style={[
          styles.containter,
          {
            backgroundColor: '#ffe4e1',
            width: this.width,
            height: this.height
          }
        ]}>
        <Animated.View
          style={[
            styles.square,
            {transform: [
              {translateY: this.state.squareY},
              {translateX: this.state.squareX},
              {rotate: this.state.rotation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })}
            ]},
            {backgroundColor: this.state.color.interpolate({
              inputRange: [0, 150],
              outputRange: ['rgba(255,0,0, 1)', 'rgba(51,156,177, 1)']
            })}
          ]} />
      </View>
    )
  }
}

export default AnimationView

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  container: {
    marginTop: 30
  }
})

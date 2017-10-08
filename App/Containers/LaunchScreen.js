import React,{Component} from 'react'
import { ScrollView, Text, Image, View } from 'react-native'


import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    console.log("foo")
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
        </ScrollView>
      </View>
    )
  }
  componentDidMount(){
    this.props.navigation.navigate('MainScreen')
  }
}

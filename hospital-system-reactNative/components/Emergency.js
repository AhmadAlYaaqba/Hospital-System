import React from 'react';
import{ StyleSheet, Text, View, AsyncStorage, ImageBackground } from 'react-native';
import {
  createStackNavigator, createBottomTabNavigator
} from 'react-navigation';
import { Button } from 'react-native-elements'
import axios from 'axios';

class Emergency extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      user:[],
      latitude: null,
      longitude: null,
      error: null,  
    }
    this.sendEmergency = this.sendEmergency.bind(this);
  }

  componentDidMount() {
    this._loadInitialState().done();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.getUser(value);
    }
  }

  getUser(value) {
    var url = 'https://tatarus-rbk.herokuapp.com/api/userController/' + value;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({    
        user: responseJson,
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  sendEmergency() {
    var obj = {
      user: this.state.user[0]._id, 
      latitude: this.state.latitude,
      longitude: this.state.longitude
    }

    axios.post('https://tatarus-rbk.herokuapp.com/emergency', obj)
      .then(function (response) {
        alert("emergency sent, please wait");
      })
      .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    if (this.state.longitude === null || this.state.longitude === undefined) {
      return (
        <View style={styles.wrapper}>
          <View style={styles.container}>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          <Text> Please turn on Location service </Text>
          </View>
        </View>
       )
    }
    return (
      <View style={styles.wrapper}>
        <ImageBackground source={require('./background.png')}  style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          <Button 
            title="Send Emergency message"
            onPress={this.sendEmergency}
            buttonStyle={{
              backgroundColor: "#bf1010",
              width: 350,
              height: 45,
              borderRadius: 5,
              marginTop: 10
            }}
          />
        </View>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default Emergency;

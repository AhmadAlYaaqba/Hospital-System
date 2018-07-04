import React from 'react';
import{ StyleSheet,
		Text,
		View, 
		ImageBackground,
		TextInput,
		KeyboardAvoidingView,
		TouchableOpacity,
		AsyncStorage } from 'react-native';
import {
  createStackNavigator, createBottomTabNavigator
} from 'react-navigation';
import { Button } from 'react-native-elements'

const backGround = './background.png';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			password:''
		}
		this.login = this.login.bind(this);
	}

	componentDidMount() {
		this._loadInitialState().done();
	}

	_loadInitialState = async () => {
		var value = await AsyncStorage.getItem('user');
		if (value !== null) {
			this.props.navigation.navigate('MainHome')
		}
	}

	login() {
		//alert(this.state.username);
		fetch('https://tatarus-rbk.herokuapp.com/api/userController/loginMobile', {
			method: 'POST',
			headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    username: this.state.username,
			    password: this.state.password,
			})
		})
		.then( (response) => response.json())
		.then( (res) => {
				//alert(res.username)
			if (res.success === true) {
				AsyncStorage.setItem('user', res.username)
				this.props.navigation.navigate('MainHome')
			} else {
				alert(res.message);
			}
		})
		.done();

	}

    render() {
    	return (
    		<KeyboardAvoidingView behavior="padding" style={styles.wrapper} >
    			<ImageBackground source={require('./background.png')}  style={{width: '100%', height: '100%'}}>
			        <View style={styles.container}>
				      	<Text style={styles.header}> Hospital Login </Text>
				      	<TextInput 
				      		style={styles.textInput}
				      		placeholder='Enter Username'
				      		onChangeText={ (username) => this.setState({username}) }
				      	/>
				      	<TextInput 
				      		style={styles.textInput}
				      		placeholder='Enter Password'
				      		onChangeText={ (password) => this.setState({password}) }
				      		secureTextEntry={true}
				      	/>
				      	<Button
				          title="Login"
				          onPress={this.login}
				          buttonStyle={{
						    backgroundColor: "#5AB9EA",
						    width: 250,
						    height: 45,
						    borderRadius: 5,
						    marginTop: 10
						  }}
				        />

			      		<TouchableOpacity
			      			style={styles.button2}
				      		onPress={() => this.props.navigation.navigate('Create')}>
				      		<Text> Dont have Account? create one</Text>
			      		</TouchableOpacity>
			        </View>
		      	</ImageBackground>
    		</KeyboardAvoidingView>
    	)
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
  header: {
    fontSize: 20,
    marginBottom: 40,
    color: "#8860D0",
    fontWeight: 'bold',
  },
  textInput: {
  	alignSelf: "stretch",
  	backgroundColor: '#fff',
  	padding: 16,
  	marginBottom: 10,
  },
  button: {
  	alignSelf: "stretch",
  	backgroundColor: '#5AB9EA',
  	alignItems: 'center',
  	padding: 20,
  	marginTop: 20,
  },
  button2: {
  	alignSelf: "stretch",
  	alignItems: 'flex-start',
  	padding: 5,
  	marginTop: 5,
  }

});
/*
				      	<TouchableOpacity
				      		style={styles.button}
				      		onPress={this.login}>
				      		<Text> Login </Text>
			      		</TouchableOpacity>
*/
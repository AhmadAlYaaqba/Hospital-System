import React from 'react';
import{ StyleSheet,
		Text,
		View, 
		Picker,
		ImageBackground,
		KeyboardAvoidingView,
		TouchableOpacity,
		AsyncStorage } from 'react-native';
import { Card, ListItem, Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImagePicker } from 'expo';
import axios from 'axios';
import { createStackNavigator } from 'react-navigation';

export default class Create extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			password:'',
			fullname:'',
			idCard:'',
			gender:'',
			phone: '',
			email: '',
			personalImgUrl: '',
			idCardImageUrl: '',
			PersImgMess: 'Please upload your image',
			IDImgMess: 'Please upload your National ID'
		}
		this.Create = this.Create.bind(this);
		this._pickImageP = this._pickImageP.bind(this);
		this._pickImageID = this._pickImageID.bind(this);
	}

	Create() {
		var obj = {
			username:this.state.username,
			password:this.state.password,
			FullName:this.state.fullname,
			idCardNumber:this.state.idCard,
			gender:this.state.gender,
			phone: this.state.phone,
			email: this.state.email,
			personalImgUrl: this.state.personalImgUrl,
			idCardImageUrl: this.state.idCardImageUrl,
		}
		axios.post('https://tatarus-rbk.herokuapp.com/api/userController/create', obj)
			.then(function (response) {
				//console.log(response.data);
				alert("Account created");
				this.props.navigation.navigate('Home');
			})
			.catch(function (error) {
    			console.log(error);
  			});
	}

	_pickImageP = async () => {
		var that = this;
	    let result = await ImagePicker.launchImageLibraryAsync({
	      aspect: [4, 3],
	      base64:true,
	    });

	    axios.post('https://api.imgur.com/3/image', result.base64, {
	        headers: {
	          "Authorization": "Client-ID bb8a64e82b834b5",
	        }
	      })
	        .then(function (response) {
	          that.setState({
	          	personalImgUrl: response.data.data.link,
	          	PersImgMess: 'Uploaded!!'
	          })
	          console.log(response.data.data.link)
	        })
	        .catch(function (error) {
	          console.log(error);
	        });

	    if (!result.cancelled) {
	      this.setState({ personalImgUrl: result.uri });
	    }
	};

	_pickImageID = async () => {
		var that = this;
	    let result = await ImagePicker.launchImageLibraryAsync({
	      aspect: [4, 3],
	      base64:true,
	    });

	    axios.post('https://api.imgur.com/3/image', result.base64, {
	        headers: {
	          "Authorization": "Client-ID bb8a64e82b834b5",
	        }
	      })
	        .then(function (response) {
	          that.setState({
	          	idCardImageUrl: response.data.data.link,
	          	IDImgMess: 'Uploaded!!'
	          })
	          console.log(response.data.data.link)
	        })
	        .catch(function (error) {
	          console.log(error);
	        });

	    if (!result.cancelled) {
	      this.setState({ idCardImageUrl: result.uri });
	    }
	};
    render() {
    	let { PersImgMess, IDImgMess } = this.state;
    	return (
    		<KeyboardAvoidingView behavior="padding" style={styles.wrapper} >
    			<ImageBackground source={require('./background.png')}  style={{width: '100%', height: '100%'}}>
			        <View style={styles.container}>
				      	<Text style={styles.header}> Create account </Text>
						<Input
						  placeholder='username'
						  placeholderTextColor='#fff'
						  inputStyle={{
						  	color: "#ffffff"
						  }}
						  onChangeText={(username) => this.setState({username})}
						  leftIcon={
						    <Icon
						      name='user'
						      size={24}
						      color='#5AB9EA'
						    />
						  }
						/>

						<Input
						  placeholder='password'
						  placeholderTextColor='#fff'
						  inputStyle={{
						  	color: "#ffffff"
						  }}
						  secureTextEntry={true}
						  onChangeText={(password) => this.setState({password})}
						  leftIcon={
						    <Icon
						      name='eye'
						      size={24}
						      color='#5AB9EA'
						    />
						  }
						/>

						<Input
						  placeholder='Email address'
						  placeholderTextColor='#fff' 
						  onChangeText={(email) => this.setState({email})}
						  inputStyle={{
						  	color: "#ffffff"
						  }}
						  leftIcon={
						    <Icon
						      name='envelope'
						      size={24}
						      color='#5AB9EA'
						    />
						  }
						/>

						<Input
						  placeholder='Full name'
						  placeholderTextColor='#fff'
						  onChangeText={(fullname) => this.setState({fullname})}
						  inputStyle={{
						  	color: "#ffffff"
						  }}
						  leftIcon={
						    <Icon
						      name='file-text'
						      size={24}
						      color='#5AB9EA'
						    />
						  }
						/>

						<Input
						  placeholder='ID card Number'
						  placeholderTextColor='#fff' 
						  onChangeText={(idCard) => this.setState({idCard})}
						  inputStyle={{
						  	color: "#ffffff"
						  }}
						  leftIcon={
						    <Icon
						      name='id-card-o'
						      size={24}
						      color='#5AB9EA'
						    />
						  }
						/>

						<Input
						  placeholder='Phone Number'
						  placeholderTextColor='#fff' 
						  onChangeText={(phone) => this.setState({phone})}
						  inputStyle={{
						  	color: "#ffffff"
						  }}
						  leftIcon={
						    <Icon
						      name='mobile-phone'
						      size={24}
						      color='#5AB9EA'
						    />
						  }
						/>

						<Picker
						  selectedValue={this.state.gender}
						  style={{ height: 50, width: 300, color: '#fff' }}
						  onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
						  <Picker.Item label="Choose Gender" value="" />
						  <Picker.Item label="Male" value="Male" />
						  <Picker.Item label="Female" value="Female" />
						</Picker>

						<Button
				          title="Choose Personal image"
				          onPress={this._pickImageP}
				          buttonStyle={{
						    backgroundColor: "#5AB9EA",
						    width: 250,
						    height: 45,
						    borderRadius: 5,
						    marginTop: 10
						  }}
				        />

				        <Text style={styles.warning}>{PersImgMess}</Text>

						<Button
				          title="Choose National ID image"
				          onPress={this._pickImageID}
				          buttonStyle={{
						    backgroundColor: "#5AB9EA",
						    width: 250,
						    height: 45,
						    borderRadius: 5,
						    marginTop: 10
						  }}
				        />

							<Text style={styles.warning}>{IDImgMess}</Text>

						<Button
						  icon={
						    <Icon
						      name='arrow-right'
						      size={15}
						      color='white'
						    />
						  }
						  buttonStyle={{
						    backgroundColor: "#5AB9EA",
						    width: 350,
						    height: 45,
						    borderColor: "#8860D0",
						    borderWidth: 0,
						    borderRadius: 5,
						    marginTop: 20
						  }}
						  title='Create'
						  onPress = {this.Create}
						/>  
						<TouchableOpacity
							style={styles.button2}
				      		onPress={() => this.props.navigation.navigate('Home')}>
				      		<Text> Already have account? Login</Text>
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
  warning: {
    fontSize: 16,
    marginTop: 10,
    color: "#b00b13",
    fontWeight: 'bold',
  },
  button2: {
  	alignSelf: "stretch",
  	alignItems: 'flex-start',
  	padding: 5,
  	marginTop: 5,
  },
});
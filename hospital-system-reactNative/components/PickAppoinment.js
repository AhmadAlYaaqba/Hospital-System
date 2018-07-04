import React from 'react'
import {View,Text,StyleSheet,AsyncStorage,ImageBackground} from 'react-native'
import { Button } from 'react-native-elements'
import PickDoctor from './PickDoctor.js'
import PickDate from './PickDate.js'
import PickTime from './PickTime.js'
import SendData from './SendComponent.js'
type Props = {};

class PickAppoinment extends React.Component{
	constructor(props){
		super(props);
		this.state={
			doctorId:"",
			doctorName:"",
      user: [],
			time:"",
			date:"",
      activeStep:0
		}
		this.myCallbackDoctor=this.myCallbackDoctor.bind(this);
		this.myCallbackDate=this.myCallbackDate.bind(this);
		this.myCallbackTime=this.myCallbackTime.bind(this);
    this.getStepContent=this.getStepContent.bind(this);
    this.getSteps=this.getSteps.bind(this);
    this.handleNext=this.handleNext.bind(this);
    this.handleBack=this.handleBack.bind(this);

	}

  componentDidMount(){
    this._loadInitialState().done();
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

	myCallbackDoctor(data){
		this.setState({
			doctorId:data.docId,
			doctorName:data.docName
		})
	}

	myCallbackDate(data){
		this.setState({
			date:data
		})
	}

	myCallbackTime(data){
		this.setState({
			time:data
		})
	}

  getStepContent(step){
    switch(step){
      case 0:
      return <PickDoctor cbFromApptoDoc={this.myCallbackDoctor}/>
      case 1:
      return <PickDate cbFromApptoDate={this.myCallbackDate}/>
      case 2:
      return <PickTime cbFromApptoTime={this.myCallbackTime} datechosen={this.state.date}/>
      case 3:
      return <SendData data={this.state}/>
    }
  }
  getSteps(){
    return [0,1,2,3];
  }
  handleNext(){
    if(this.state.activeStep===0){
      if(this.state.doctorId){
        this.setState({
         activeStep:this.state.activeStep +1
        })
      }else{
        alert('please pick a doctor')
      }
    }

    if(this.state.activeStep===1){
      if(this.state.date){
        this.setState({
         activeStep:this.state.activeStep +1
        })
      }else{
        alert('please pick a date')
      }
    } 

    if(this.state.activeStep===2){
      if(this.state.time){
        this.setState({
         activeStep:this.state.activeStep +1
        })
      }else{
        alert('please pick a time')
      }
    }

    if(this.state.activeStep===3){
      var obj={
        date:this.state.date,
        hour:this.state.time,
        doctorId:this.state.doctorId,
        userId: this.state.user[0]._id,
      }
      console.log(obj);
      //here we will send the the data

      fetch('http://tatarus-rbk.herokuapp.com/app', {
      method: 'POST', 
      body: JSON.stringify(obj), 
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

      this.state.date = '';
      this.state.time = '';
      this.state.doctorId = ''; 
      this.state.activeStep = 0;     
    }      
    
  }

  handleBack(){
    if(this.state.activeStep===0){
    }else{
    this.setState({
      activeStep:this.state.activeStep -1
    })      
    }

  }
	render(){
    var that=this
    const steps=this.getSteps();
		return(
		<View style={styles.wrapper}>
    <ImageBackground source={require('./background.png')}  style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            {that.getStepContent(this.state.activeStep)}
          </View>
    <View style={styles.container}>
      <Button
        buttonStyle={{
          backgroundColor: "#5AB9EA",
          width: 350,
          height: 50,
          borderColor: "#8860D0",
          borderWidth: 0,
          borderRadius: 5,
          marginTop: 20
        }}
        title='Back'
        onPress = {this.handleBack}
      />  
      <Button
        buttonStyle={{
          backgroundColor: "#5AB9EA",
          width: 350,
          height: 50,
          borderColor: "#8860D0",
          borderWidth: 0,
          borderRadius: 5,
          marginTop: 20
        }}
        title='Next'
        onPress = {this.handleNext}
      />  
    </View>
    </ImageBackground>
			</View>
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
    fontSize: 26,
    marginBottom: 40,
    color: "#8860D0",
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 20,
  }
})

export default PickAppoinment;


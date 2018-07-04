import React from 'react';
import {TextInput, Text, View,Button,StyleSheet,Picker,Alert} from 'react-native';
let url='http://tatarus-rbk.herokuapp.com';

class PickDoctor extends React.Component{
	constructor(props){
		super(props);
		this.state={
			doctors:[],
			doctor:'',
			doctorName:''
		}
		this.handleDoctor=this.handleDoctor.bind(this)
	}

	


	componentDidMount(){
		fetch(url+'/Doctor/retrieve')
		    .then((response) => response.json())
		    .then((responseJson) => {
		      this.setState({
		      	doctors:responseJson
		      })
		    })
		    .catch((error) => {
		      console.error(error);
		    });
	}		



	handleDoctor(itemValue){
		var x;
		for(var i=0;i<this.state.doctors.length;i++){
			if(this.state.doctors[i]._id===itemValue){
				this.setState({
					doctorName:this.state.doctors[i].fullName
				})
				x=this.state.doctors[i].fullName;
			}
		}
		
		this.setState({doctor: itemValue})
		var obj={
			docId:itemValue,
			docName:x
		}
		this.props.cbFromApptoDoc(obj)	
	}

	

	render(){
		return(
			<View style={styles.container}>
		      <Text style={styles.header}>Choose Doctor</Text>	
		      <View style={{justifyContent:'center' }}>
		        <Picker
				  selectedValue={this.state.doctor}
				  style={{ height: 200, width: 350}}
				  selectedValue = {this.state.doctor}
				  onValueChange={this.handleDoctor}>
				  		<Picker.Item label='choose' value='' />
				  {this.state.doctors.map(function(doctor, index){
				  	return(
				  		<Picker.Item label={doctor.fullName} key={index} value={doctor._id} />
				  		)
				  })}
				</Picker>
				</View>
			</View>
			)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  header: {
    fontSize: 20,
    color: "#8860D0",
    fontWeight: 'bold',
  },
})

export default PickDoctor;


import React from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
let url='http://tatarus-rbk.herokuapp.com/app';
class SendData extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.header}>you pick an appoinment with doctor {this.props.data.doctorName}
				</Text>
				<Text style={styles.header}>
				at {this.props.data.date} on {this.props.data.time}
				</Text>
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
    fontSize: 26,
    color: "#8860D0",
    fontWeight: 'bold',
  },
})

export default SendData;
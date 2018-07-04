import React from 'react';
import { Text, TouchableOpacity, View,StyleSheet } from 'react-native';
import TimePicker from 'react-native-datepicker'

class PickTime extends React.Component{
	constructor(props){
		super(props);
		this.state={
			time:"",
			app:[]
		}
		this.handleTime=this.handleTime.bind(this)
	} 

	componentDidMount(){
		var arr=[];
		fetch('http://tatarus-rbk.herokuapp.com/app')
	    .then((response) => response.json())
	    .then((responseJson) => {
	    	for(var i=0;i<responseJson.length;i++){
	    		arr.push(responseJson[i])
	    	}
	    })
	    .catch((error) => {
	      console.error(error);
	    });
	       this.setState({
	      	app:arr
	       })
	}


	handleTime(date){
		var flage=true
		for(var i=0;i<this.state.app;i++){
			if(this.state.app[i].date===this.props.datechosen&&this.state.app[i].hour===date){
				flage=false
			}	
		}
		if(flage){
			this.setState({
				time:date
			})
			this.props.cbFromApptoTime(date)			
		}else{
			alert('pick avaliable time')
		}

		
	}

	render () {
    return (
      <View style={{alignItems: 'center',justifyContent:'center'}}>
      <Text style={styles.header}> Choose Time </Text>
        <TimePicker
        mode="time"
        time=''
        onDateChange={this.handleTime}
      />	
      </View>
    );
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


export default PickTime





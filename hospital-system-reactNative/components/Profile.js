import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import moment from 'moment';

class Profile extends React.Component{
constructor(props){
    super(props);
    this.state ={
      data:[],
       tableResult: ['Lab Tech Name', 'Sample Time', 'Result  Time','Description','Image Result'],
       tableMedical:['Doctor Name', 'Description', 'Image Medical'],
       modalVisible: false,
       imageREsult:''
    }
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
        data: responseJson,
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  setModalVisible(visible,value) {
    this.setState({ modalVisible: visible,image:value });
  }

  render(){
    const showMidecal = (value) => (
      <TouchableOpacity onPress={() => this.setModalVisible(true,value)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Show</Text>
        </View>
      </TouchableOpacity>
    );
    const showResult = (value) => (
      <TouchableOpacity onPress={() => this.setModalVisible(true,value)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Show</Text>
        </View>
      </TouchableOpacity>
    );
    var state = this.state;
    if(this.state.data.length>0){
    return (
    <ImageBackground source={require('./background.png')}  style={{width: '100%', height: '100%'}}>
    <ScrollView>
    <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        this.setModalVisible(!this.state.modalVisible);
        alert('Back To Profile.');
      }}>
      <View style={{marginTop: 22}}>
      <View>    
        <View style={styles.imageM}>
          <Image style={styles.imageMod} source={{uri:this.state.image}} />
        </View>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              alert('Back To Profile.')
            }}>
            <Text style={styles.btnText}>Back To Profile</Text>
          </TouchableHighlight>
      </View>
      </View>
    </Modal>
    {this.state.data.map(function(user,index){
      return(
        <View style={styles.header} key={index}>
          <View style={styles.profilepicWrap}>
            <Image style={styles.profilepic} source={{uri:user.personalImgUrl}} />
          </View>
          <Text style={styles.name}>{user.FullName}</Text>
          <Text style={styles.pos}> {user.email}</Text>
          <Text style={styles.pos}>{user.phone}</Text>
        </View>
        )
    })}
   <Text> {'\n'} </Text>
   <Text style={{textAlign: 'center'}}>User Lab Result</Text>
    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
      <Row data={state.tableResult} style={styles.head} textStyle={styles.text}/>
      
      {this.state.data[0].labResults.map(function(elem,index){
        return(
          <Rows key={index} data={[[elem.labTechnicianId.fullName,moment(elem.medicalExaminationTime).calendar() ,moment(elem.resultEntryTime).calendar() ,elem.description,showResult(elem.imageOfResult)]]} textStyle={styles.text}/>
          )
      })} 
       </Table>
    <Text> {'\n'} </Text>
    <Text style={{textAlign:'center'}}>User Medical Records</Text> 
    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
      <Row data={state.tableMedical} style={styles.head} textStyle={styles.text}/>
      
      {this.state.data[0].medicalRecords.map(function(elem,index){
        return(
          <Rows key={index} data={[[elem.doctorId.fullName, elem.description, showMidecal(elem.image)]]} textStyle={styles.text}/>
          )
      })} 
       </Table>  
    </ScrollView>
       </ImageBackground>   
  );
  }else{
    return(
    <Text></Text>
    );
  }
  }
} 
const styles = StyleSheet.create({

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#3093c3',
  },
  profilepicWrap: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 10,
    marginTop: 10,
  },
  profilepic: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4
  },
  name: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  pos: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    fontStyle: 'italic'
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6, 
    textAlign: 'center' 
  },

  btn: { 
    width: 58, 
    height: 18, 
    marginLeft: 15, 
    backgroundColor: '#c8e1ff', 
    borderRadius: 2 ,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: { 
    textAlign: 'center',
    backgroundColor: '#c8e1ff', 
},
  container: {
      alignItems: 'center',
      backgroundColor: '#ede3f2',
      padding: 100
   },
   imageMod:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width:400,
    height:400
   },
   imageM:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
   },
   modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f7021a',
      padding: 100
   },
   text1: {
      color: '#3f2949',
      marginTop: 10
   }
});

export default Profile;
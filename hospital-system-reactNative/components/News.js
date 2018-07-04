import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground  } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';

export default class News extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,data:[],}
  }

  componentDidMount(){
    return fetch('https://tatarus-rbk.herokuapp.com/news')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({    
          isLoading: false,
          data: responseJson,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    return(
      <ImageBackground source={require('./background.png')}  style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
      <ScrollView>
       {this.state.data.map(function(item,index){
        return(
          <Card title={item.newsSubject} key={index}>
          <View style={styles.center}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri:item.Image}}
          />
          </View>
          <Text>{item.newsText}</Text>
          <Text style={styles.date}>Added at: {moment(item.createdAt).calendar()}</Text>
          </Card>   
          );
       })}
      
      </ScrollView>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    marginBottom: 50,
    marginTop:50
  },
 date: { 
  color: 'blue',
  fontSize: 12,
   },
   center: {
    justifyContent: 'center',
    alignItems: 'center',
   }
});
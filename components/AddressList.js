import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";
import autoBind from 'react-autobind/src/autoBind';
import {Navigation, NavigationComponent} from 'react-native-navigation';
import Constants, {dishesObjects, foodListCN, foodListEN} from '../Constants.js';
import { MapView } from "react-native-amap3d";

export default class AddressList extends NavigationComponent{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      longitude: 0,
      latitude: 0,
      radius: '100000',
      type: '050000',
      listLoading: true,
      locationLoaded: false,
      // modalVisible: this.props.modalVisible
    };
    autoBind(this);
  }

  onLocationChange(latitude, longitude, foodName) {
    if(latitude!=0 && longitude!=0 && this.state.listLoading){
      this.setState({
        latitude: latitude,
        longitude: longitude,
        locationLoaded: true,
      });
      
    }
    if (this.state.locationLoaded) {
      this.getList(foodName);
      this.setState({
        locationLoaded: false,
      });
    }
  }
  
  handleBack(){
    Navigation.pop('rootStack');
  }

  handleMap(item){
    Navigation.push(this.props.componentId, {
      component: {
        name: 'MapScreen',
        passProps: {
          item: item
        }
      },
    });
  }

  async getList(keyword) {
    let parameters = 'key=fa3df295c047c0495089bd02c270a901&location='
    +this.state.longitude.toFixed(6)+','+this.state.latitude.toFixed(6)+'&radius='
    +this.state.radius+'&types='+this.state.type+'&keywords='+this.props.searchFood.name+'&offset=20&page=1&sortrule=weight&extensions=all';
    console.log(parameters)
    fetch('https://restapi.amap.com/v3/place/around?'+parameters,{method: 'GET'})
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ listLoading: false });
      });
  }



  render(){    
    let foodName = this.props.searchFood.name
    const {data, listLoading} = this.state;
    let itemList = [];
    if(data.status==1 && !listLoading){
      itemList = data.pois
      itemList=itemList.map(item=><View key={item.name}>
        <View style={styles.item}>
          <View  style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{...styles.text, fontSize:20, paddingBottom:10, width: 240}}>{item.name}</Text>
            <TouchableOpacity onPress={e=>this.handleMap(item)}>
              <Image style={{width: 26, height:26}} source={require('../assets/map.png')}></Image>
            </TouchableOpacity>
          </View>
          <Text style={{...styles.text, paddingRight: 20}}>Address: {item.address}</Text>
          <Text style={styles.text}>Tel: {item.tel}</Text>
        </View>
      </View>)
    }
    
    return (
      <View style={{flex:1, flexDirection:'column', backgroundColor:Constants.themeColor}}>
        <MapView style={styles.mapContainer}
          center={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          locationEnabled
          onLocation={e => this.onLocationChange(e.latitude, e.longitude, foodName)}
          showsZoomControls={true}
          zoomLevel={16}
        />
        
        {this.state.listLoading ? <ActivityIndicator style={{flex:1, padding: 50}} size='large' color='white' /> : (
          <View>
            <TouchableOpacity onPress={this.handleBack}>
              <Text style={{...styles.text, fontSize:24, paddingLeft:20,paddingTop:20}}>>Back</Text>
              <Text style={{...styles.text, fontSize:16, paddingLeft:20}}>Found {data.count} restaurants for you:</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}>
              {itemList}
            </ScrollView>
          </View>
        )} 

      </View>

    );
    
  }

  
}

const styles = StyleSheet.create({
  scrollView:{
    flexDirection:'column',
    // marginTop:
  },
  item: {
    backgroundColor: '#f8f8ff',
    borderRadius: 30,
    elevation: 10,
    width: Constants.width,
    height: Constants.height,
    flexDirection: 'column',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    padding: 4,
    fontSize: 14,
    fontFamily: 'Ubuntu-Bold',
  },
  mapContainer:{
    width:0,
    height: 0
  }

});
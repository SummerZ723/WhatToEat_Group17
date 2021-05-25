import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  StyleSheet,
  View,
  Text,
  Image,
  PermissionsAndroid
} from "react-native";
import autoBind from 'react-autobind/src/autoBind';
import {Navigation, NavigationComponent} from 'react-native-navigation';
import { MapView } from "react-native-amap3d";
import Constants from '../Constants';

export default class MapScreen extends NavigationComponent{
  constructor(props) {
    super(props)
    this.state = {

    };
    autoBind(this);
  }




  render(){    
    let location = this.props.item.location.split(',')
    console.log(location)
    
    return (

      // <View style = {styles.map}>

        <View style = {styles.map}>
          <View style={styles.topCard}>
            <Text style={styles.text}>{this.props.item.name}</Text>
            <Text style={{...styles.text, fontSize: 14}}>Address: {this.props.item.address}</Text>
            <Text style={{...styles.text, fontSize: 14}}>Tel: {this.props.item.tel}</Text>
          </View>
          <MapView style = {styles.map}
            showsZoomControls={true}
            zoomLevel={17}
            center={{
              latitude: parseFloat(location[1]),
              longitude: parseFloat(location[0])
              }}>

            <MapView.Marker
              // icon={() => (
              //   <Image source={require('../assets/map_marker.png')} style={styles.customMarker}/>
              // )}
              draggable
              title={this.props.item.name}
              onDragEnd={({ nativeEvent }) =>
                console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
              }
              coordinate={{
                latitude: parseFloat(location[1]),
                longitude: parseFloat(location[0])
              }}
            />
          </MapView>

        </View>
      // </View>
    );
    
  }

  
}

const styles = StyleSheet.create({
  map: {
    flex:1
  },
  topCard:{
    height: 80,
    backgroundColor: Constants.themeColor,
    justifyContent:'center',
    paddingLeft:20
  },
  text:{
    paddingVertical: 1,
    color:'black',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold'    
  },
  customInfoWindow: {
    backgroundColor: "#8bc34a",
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#689F38",
    marginBottom: 5
  },
  customMarker: {
    width: 60,
    height: 60
  },
  markerText: {
    color: "#fff"
  }
});
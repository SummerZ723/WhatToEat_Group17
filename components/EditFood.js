import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  StatusBar
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import autoBind from 'react-autobind/src/autoBind';
import {Navigation, NavigationComponent} from 'react-native-navigation';
import Constants, {dishesObjects, foodListCN, foodListEN} from '../Constants.js';

export default class EditFood extends NavigationComponent{
  constructor(props) {
    super(props)
    this.state = {
      itemOn: new Array(dishesObjects.length),
      foodList: dishesObjects,
    };
    for(let index=0; index<dishesObjects.length;index++){
      this.state.itemOn[index] = dishesObjects[index].on;
    }
    autoBind(this);
  }

  toggleOn(i){
    let tmp = this.state.itemOn;
    tmp[i] = !tmp[i];
    this.setState({itemOn: tmp});
  }

  handleDelete(i){

  //   let tmp = this.state.foodList;
  //   tmp.splice(i);
  //   console.log(tmp.length);
  //   // this.setState({dishesObjects: tmp});
  }

  getTag(item){
    let tag = '';
    if(item.breakfast){
      tag += '#Breakfast '
    }
    if(item.lunch){
      tag += '#Lunch '
    }
    if(item.dinner){
      tag += '#Dinner '
    }
    if(item.night){
      tag += '#Night'
    }
    return tag;
  }

  render(){
    const {itemOn} = this.state;
    let itemList = dishesObjects;
    itemList=itemList.map((item,index)=><View style={styles.item} key={item.name}>
      <View style={styles.items}>
        <Text style={styles.text}>{index+1}. {item.name}</Text>
        <Text style={{...styles.text, fontSize: 16}}>{this.getTag(item)}</Text>
      </View>
      <View style={styles.edit}>
        <Switch
          trackColor={{ false: "#767577", true: Constants.themeColor }}
          thumbColor={itemOn[index] ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={()=>this.toggleOn(index)}
          style={styles.switch}
          value={itemOn[index]}
        />
        <View>
          <TouchableOpacity style={styles.delete} onPress={this.handleDelete(index)}>
            <Text style={{fontFamily:'Ubuntu-Bold',fontSize:14, color:'white'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>)

    return (
      <View style={{flex:1, backgroundColor:Constants.themeColor}}>
        <StatusBar barStyle="light-content" backgroundColor={Constants.themeColor} />
        <Text style={{...styles.text, fontSize: 26, margin:20}}>Custom Menu</Text>
          <ScrollView style={styles.scrollView}>
            {itemList}
          </ScrollView>
      </View>

    );
    
  }

  
}

const styles = StyleSheet.create({
  text:{
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
    marginVertical: 5
  },
  scrollView:{
    flex:1, 
    flexDirection:'column',
  },
  item:{
    backgroundColor: '#f8f8ff',
    borderRadius: 30,
    elevation: 10,
    width: Constants.width,
    height: Constants.height,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection:'row', 
  },
  items:{
    width: '76%'
  },
  edit:{
    flexDirection:'column',
    alignItems:'center',
  },
  switch:{
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },
  delete:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:8,
    marginTop: 8,
    height:30,
    width:60,
    borderRadius:10,
    backgroundColor:'red'
  }

});
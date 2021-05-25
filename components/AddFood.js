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
  Switch
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import autoBind from 'react-autobind/src/autoBind';
import {Navigation, NavigationComponent} from 'react-native-navigation';
import Constants, {dishesObjects, foodListCN, foodListEN} from '../Constants.js';

export default class AddFood extends NavigationComponent{
  constructor(props) {
    super(props)
    this.state = {
      foodName: '',
      keyword:'',
      level: '0',
      breakfast: true,
      lunch: true,
      dinner: true,
      night: true,
    };
    autoBind(this);
  }

  handlePickerChange = (itemValue, itemIndex)=>{
    this.setState({level: itemValue});
  }

  handleAdd(){
    let addFood =   {
      "name": this.state.foodName,
      "src": require("../assets/cutlery.png"),
      "typecode": "050100",
      "level": this.state.level,
      "min": 1,
      "max": 4,
      "breakfast": this.state.breakfast,
      "lunch": this.state.lunch,
      "dinner": this.state.dinner,
      "night": this.state.night,
      "on": true
    }
    console.log('00000'+addFood.name)
    Navigation.pop('rootStack',{
      component: {
        name: 'HomeScreen',
        passProps: {
          addFood: addFood
        }
      },
    });
  }

  toggleBreakfast = () =>{
    this.setState({breakfast: !this.state.breakfast});
  }

  toggleLunch = () =>{
    this.setState({lunch: !this.state.lunch});
  }

  toggleDinner = () =>{
    this.setState({dinner: !this.state.dinner});
  }

  toggleNight = () =>{
    this.setState({night: !this.state.night});
  }

  render(){


    return (
      <View style={{flex:1}}>
        <Text style={{...styles.text, fontSize: 26, margin:20}}>Add a dish:</Text>
        <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
          <View>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>Name:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text), text => this.setState({ foodName: text })}
                placeholder='New Food name'
                placeholderTextColor='#676767'
                textAlign='left'
                // value={value}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>Keyword:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text), text => this.setState({ keyword: text })}
                placeholder='Searching keyword'
                placeholderTextColor='#676767'
                textAlign='left'
              />
            </View>
            <View style={styles.rowContainer}>
              <View style={{flex:1}}><Text style={styles.text}>Budget:</Text></View>
              <View style={{backgroundColor: Constants.themeColor,borderRadius:20, flex:2,height: 40, justifyContent:'center',padding:10}}>
                <Picker
                  selectedValue={this.state.level}
                  style={styles.picker}                
                  mode={'dropdown'}
                  onValueChange={this.handlePickerChange}
                >
                  <Picker.Item label= 'Small Meal' value='1' />
                  <Picker.Item label= 'Big Meal' value='2' />
                </Picker>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={{flex:1}}><Text style={styles.text}>Breakfast:</Text></View>
              <View style={{flex:2, alignItems:'center'}}>
                <Switch
                  trackColor={{ false: "#767577", true: Constants.themeColor }}
                  thumbColor={this.state.breakfast ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleBreakfast}
                  style={styles.switch}
                  value={this.state.breakfast}
                />
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={{flex:1}}><Text style={styles.text}>Lunch:</Text></View>
              <View style={{flex:2, alignItems:'center'}}>
                <Switch
                  trackColor={{ false: "#767577", true: Constants.themeColor }}
                  thumbColor={this.state.lunch ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleLunch}
                  style={styles.switch}
                  value={this.state.lunch}
                />
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={{flex:1}}><Text style={styles.text}>Dinner:</Text></View>
              <View style={{flex:2, alignItems:'center'}}>
                <Switch
                  trackColor={{ false: "#767577", true: Constants.themeColor }}
                  thumbColor={this.state.dinner ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleDinner}
                  style={styles.switch}
                  value={this.state.dinner}
                />
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={{flex:1}}><Text style={styles.text}>Night:</Text></View>
              <View style={{flex:2, alignItems:'center'}}>
                <Switch
                  trackColor={{ false: "#767577", true: Constants.themeColor }}
                  thumbColor={this.state.night ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleNight}
                  style={styles.switch}
                  value={this.state.night}
                />
              </View>
            </View>
          </View>
          <View style={{margin:40}}>
            <TouchableOpacity 
              onPress={this.handleAdd}
              style={{width: 200, height: 60, borderRadius:30, alignItems:'center', alignSelf:'center',justifyContent:'center', backgroundColor:Constants.themeColor}}>
              <Text style={{fontFamily:'Ubuntu-Bold', fontSize: 22}}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
    
  }

  
}

const styles = StyleSheet.create({
  switch:{
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
  },
  text:{
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
  },
  picker:{
    backgroundColor: Constants.themeColor,
  },

  textInput:{
    height: 40, 
    width: 230, 
    backgroundColor: 'white', 
    borderRadius:20,
    paddingLeft:26,
    fontSize:16,
    backgroundColor: Constants.themeColor,
  },
  
  rowContainer:{
    flexDirection:'row', 
    justifyContent:'space-between',
    marginHorizontal:20, 
    marginVertical:10, 
    alignItems:'center'
  }
});
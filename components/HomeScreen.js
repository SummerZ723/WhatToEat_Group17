import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Easing,
  Dimensions,
  Modal,
  StatusBar
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import autoBind from 'react-autobind/src/autoBind';
import {Navigation, NavigationComponent} from 'react-native-navigation';
import Constants, {dishesObjects} from '../Constants.js';


const width = 180
const speed = 60
const budgetEN = ["Unlimited", "Small Meal", "Big Meal"]
const eatTypeEN = ["Unlimited", "Breakfast", "Lunch",  "Dinner", "Supper"]
const budgetCN = ["不限", "随便吃吃", "大吃一顿"]
const eatTypeCN = ["不限", "早餐", "午餐", "晚餐", "夜宵"]

let allItems = dishesObjects

const showList = allItems.slice(0,4)

function dishesFillter(dishObjects, budgetIndex, eatTypeIndex){
  console.log("筛选", budgetIndex, eatTypeIndex)
  var newDishes = new Array()
  //Filter for each dish
  for(var dishObjectIndex in dishObjects){
    var pass = true;
    var dishObject = dishObjects[dishObjectIndex]
    //Select budget type
    switch (parseInt(budgetIndex)) {
      case 1:
        //Determining if it is a "casual"
        if (!(dishObject.level === 1)) pass = false
        break;
      case 2:
        //Determining whether a meal is a "big meal"
        if (!(dishObject.level === 2)) pass = false
        break;
      default:
    }
    //Select eat type
    switch (parseInt(eatTypeIndex)) {
      case 1:
        //Determining if it's breakfast
        if (!dishObject.breakfast) pass = false
        break;
      case 2:
        //Determining if it's lunch
        if (!dishObject.lunch) pass = false
        break;
      case 3:
        //Determining if it's dinner
        if (!dishObject.dinner) pass = false
        break;
      case 4:
        //Determining if it's supper
        if (!dishObject.night) pass = false
        break;
      default:
    }
    if (!dishObject.on){
      pass = false
    }
    //If it passes the filter then add to the array
    if(pass){
      newDishes.push(dishObject)
    }
  }
  return newDishes
}

export default class HomeScreen extends NavigationComponent {
  translateX=new Animated.Value(-width/2)
  anmi = null
  cancelTimer = null;
  index = 4;

  constructor(props, state){
    super(props, state);
    this.state = {
      selectedType: 0,
      selectedBudget: 0,
      currentDishes: allItems,
      showList: showList,
      modalVisible: false,
      addFood: false,
      language:'EN'
    };

    autoBind(this);
  }

  componentDidAppear(){
    console.log("addFood "+this.state.addFood);
    if(this.state.addFood){
      allItems.push(this.props.addFood);
      console.log(allItems);
    }
    this.setState({addFood: false});
    console.log("addFood "+this.state.addFood);
  }

  async handleYes(){
    await this.setState({ modalVisible: false });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'AddressList',
        passProps: {
          searchFood: this.state.showList[1]
        }
      },
    });
  }

  async handleAdd(){
    await this.setState({addFood: true});
    console.log("addFood handleadd "+this.state.addFood);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'AddFood',
      },
    });
  }

  async handleEdit(){
    Navigation.push(this.props.componentId, {
      component: {
        name: 'EditFood',
      },
    });
  }

  handleChart(){
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShowChart',
      },
    });
  }


  handlePickerChange = async(itemValue, itemIndex)=>{
    await this.setState({selectedType: itemIndex});
    this.setState({currentDishes: dishesFillter(dishesObjects, this.state.selectedBudget, this.state.selectedType)})
    this.setState({showList: this.state.currentDishes.slice(0,4)})
  }

  rolling = ()=>{
    // console.log('rolling')
    // console.log(showList[1])
    this.setState((state)=>{
      state.showList = showList
      return state;
    })
    Animated.timing(this.translateX,
      {
        toValue:0-1.5*width,
        duration:speed,
        useNativeDriver: false,
        easing: Easing.linear
      },
    ).start()

    setTimeout(()=>
      {        
        showList.shift()    
        showList.push(this.state.currentDishes[(this.index++)%this.state.currentDishes.length])
        // console.log(showList)
        this.setState((state)=>{
          state.showList = showList
          return state;
        })
        Animated.timing(this.translateX,
          {
            toValue:-width*0.5,
            duration:0,
            useNativeDriver: false
          }
        ).start()
        
      }, speed
    )
  }

  render(){
    const { modalVisible, language } = this.state
    let i = 0
    let itemList = this.state.showList
    itemList=itemList.map(item=><View key={this.index+i++} 
      style={{
        width:200
      }}>
      <View style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          <View style={{width:100, height:100, borderRadius: 100, backgroundColor: 'white', justifyContent:'center', alignItems:'center'}}>
            <Image source={item.src} resizeMode={'contain'}  style={{width:80, height:80, borderRadius: 10}}/>
          </View>
          
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>{language=='EN'?item.nameEN:item.name}</Text>
        </View>
      </View>
    </View>)

    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{language=='EN'?"Are you sure to eat:":'你是否确定要吃:'}</Text>
              <Text style={{...styles.modalText, fontSize: 24}}>{language=='EN'?this.state.showList[1].nameEN:this.state.showList[1].name}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{ ...styles.openButton }}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                >
                  <Text style={styles.textStyle}>{language=='EN'?"No, next one":"不，下一个"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.openButton }}
                  onPress={() => {
                    this.handleYes();
                  }}>
                  <Text style={styles.textStyle}>{language=='EN'?"Yes, eat it":"是，就选它"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{flex:1, flexDirection:'row', margin:20,justifyContent:'space-between'}}>
          <TouchableOpacity onPress={()=>this.setState({language: language=='EN'? 'CN':'EN'})}>
            <View style={{backgroundColor:Constants.themeColor,padding:8, borderRadius:50}}>
              <Text style={{fontFamily:'Ubuntu-Bold',fontSize:22, color:'white'}}>{language}</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{marginHorizontal:5}} onPress={this.handleChart}>
              <Image style={{width:45, height:45}} source={require('../assets/pie-chart.png')}></Image>
            </TouchableOpacity> 
            <TouchableOpacity style={{marginHorizontal:5}} onPress={this.handleEdit}>
              <Image style={{width:45, height:45}} source={require('../assets/pencil.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:5}} onPress={this.handleAdd}>
              <Image style={{width:45, height:45}} source={require('../assets/plus.png')}></Image>
            </TouchableOpacity>
          </View>        
        </View>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>>{language=='EN'?" Let's eat...":' 让我们吃...'}</Text>
        </View>
        <View style={styles.reelContainer}>
          <Animated.View style={{transform:[{translateX:this.translateX}],flexDirection:'row'}} >
            {itemList}
          </Animated.View>
        </View>

        <View style={styles.filterContainer}>
          <View style={styles.chooseTitle}>
            <Text style={styles.chooseText}>>{language=='EN'?" Choose...":' 选择...'}</Text>
          </View>
          <View style={styles.classContainer}>

            <View style={styles.classNameContainer}>
              <Text style={styles.classNameText}>{language=='EN'?"Type":"类别"}</Text>
              <Text style={styles.classNameText}>{language=='EN'?"Budget": "预算"}</Text>
            </View>

            <View style={styles.pickersContainer}>
                <Picker
                  selectedValue={this.state.selectedType}
                  mode={'dropdown'}
                  style={styles.picker}
                  onValueChange={this.handlePickerChange}
                >
                <Picker.Item label= {language=='EN'?eatTypeEN[0]:eatTypeCN[0]} />
                <Picker.Item label= {language=='EN'?eatTypeEN[1]:eatTypeCN[1]} />
                <Picker.Item label= {language=='EN'?eatTypeEN[2]:eatTypeCN[2]} />
                <Picker.Item label= {language=='EN'?eatTypeEN[3]:eatTypeCN[3]} />
                <Picker.Item label= {language=='EN'?eatTypeEN[4]:eatTypeCN[4]} />
              </Picker>
                <Picker
                  selectedValue={this.state.selectedBudget}
                  style={styles.picker}                
                  mode={'dropdown'}
                  onValueChange={this.handlePickerChange}
                >
                  <Picker.Item label= {language=='EN'?budgetEN[0]:budgetCN[0]} />
                  <Picker.Item label= {language=='EN'?budgetEN[1]:budgetCN[1]} />
                  <Picker.Item label= {language=='EN'?budgetEN[2]:budgetCN[2]} />
                </Picker>
            </View>
          </View>
          
        </View>

        <View style={styles.startContainer}>
          <View style={styles.outbuttonContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={(e)=>{
                console.log(this.state.modalVisible)
                if(this.cancelTimer ==null ) this.cancelTimer=setInterval(()=>this.rolling(),speed+30)
                else {
                  this.setState({ modalVisible: true });
                  clearInterval(this.cancelTimer)
                  this.cancelTimer=null
                }
              }}>
            <Image source={require('../assets/play_icon.png')} style={styles.image}/>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );   
  }
    
}

// module.exports = HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#FAF5F1",
    flexDirection: 'column',
  },

  topContainer:{
    flex: 1,
    paddingLeft:40,
    justifyContent: 'flex-end',
  },
  topText:{
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    marginBottom: 30
  },

  reelContainer:{
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardContainer:{
    backgroundColor: Constants.themeColor,
    borderRadius: 30,
    elevation: 10,
    width: Constants.Height*0.2,
    height: Constants.Height*0.3,
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardImageContainer:{
    flex:3,
    justifyContent: 'center',
    // width: 100,
  },
  cardTextContainer:{
    flex:1,
    justifyContent:'center',
    paddingBottom:20,
    paddingHorizontal: 20,
  },
  cardText:{
    color:'black',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold'
  },

  filterContainer:{
    marginTop:12,
    flex: 3,
    flexDirection: 'column',
    justifyContent:'center',
  },
  chooseTitle:{
    paddingLeft:40,
  },
  chooseText:{
    color:'black',
    fontSize: 24,
    fontFamily: 'Ubuntu-Bold'    
  },
  pickersContainer:{
    flex:3,
    flexDirection: 'column',
    padding:20
  },
  classContainer:{
    flexDirection: 'row',
  },
  classNameContainer:{
    flex:2,
    alignItems:'flex-end',
    padding:20,
  },
  classNameText:{
    margin:15,
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
  },


  startContainer:{
    flex: 1,
    alignItems:'center',
    paddingBottom:60,
  },
  buttonContainer:{
    width: 80,
    height:80,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:80,
    elevation: 10,
  },
  image:{
    width: 80,
    height:80
  },
  centeredView: {
    width: Constants.Width,
    height: Constants.Height,
    flex:1,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  }
  ,
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignSelf: 'center',
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: Constants.themeColor,
    borderRadius: 20,
    padding: 14,
    margin: 5,
    elevation: 2
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontFamily: 'Ubuntu-Bold'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:'black',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold'  
  }



});

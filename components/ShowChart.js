import {
  PieChart,
  ProgressChart
} from "react-native-chart-kit";
import React from 'react';
import {Navigation, NavigationComponent} from 'react-native-navigation';
import { render } from 'react-dom';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import autoBind from 'react-autobind';
import Constants from '../Constants.js';

const data = [
  {
    name: "KFC",
    population: 216,
    color: 'rgba(255, 255, 255, 0.4)',
    legendFontColor: "#000000",
    legendFontSize: 16,
    
  },
  {
    name: "Rice Noodle",
    population: 280,
    color: 'rgba(255, 255, 255, 0.8)',
    legendFontColor: "#000000",
    legendFontSize: 16
  },
  {
    name: "Fried Noodles",
    population: 527,
    color: 'rgba(255, 255, 255, 1)',
    legendFontColor: "#000000",
    legendFontSize: 16
  },
  {
    name: "Hot Pot",
    population: 253,
    color: 'rgba(255, 255, 255, 0.6)',
    legendFontColor: "#000000",
    legendFontSize: 16
  },
  {
    name: "Szechuan Cuisine",
    population: 119,
    color: 'rgba(255, 255, 255, 0.2)',
    legendFontColor: "#000000",
    legendFontSize: 16
  }
];
const chartConfig =   {
  color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
}
const chartConfig1={
  backgroundColor: '#022173',
  backgroundGradientFrom: '#022173',
  backgroundGradientTo: '#1b3fa0',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
}

const data1 = {
  labels: ["Breakfast", "Lunch", "Dinner"], // optional
  data: [0.4, 0.6, 0.8]
};
export default class ShowChart extends NavigationComponent {

  constructor(){
    super();
    autoBind(this);
  }
  render(){
    return(
      <View style={{flex:1, backgroundColor: '#EAEAEA'}}>
        <View>
          <Text style={{fontFamily:'Ubuntu-Bold',fontSize:28, margin:20}}>Statictic Charts</Text>
        </View>
        <View style={styles.piechart}>
          <PieChart
            style={{
              // backgroundColor:'green',
            flex:1, justifyContent:'center'}}
            data={data}
            width={300}
            height={140}
            chartConfig={chartConfig}
            accessor={"population"}
            // backgroundColor={"yellow"}
            // paddingLeft={"16"}
            center={[0, 10]}
            // absolute
          />
        </View>
        <View style={styles.piechart}>
          <ProgressChart
          style={{
            borderRadius: 30}}
            data={data1}
            width={335}
            height={180}
            strokeWidth={16}
            radius={36}
            chartConfig={chartConfig1}
            hideLegend={false}
          />
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
piechart:{
  backgroundColor: Constants.themeColor,
  margin: 20,
  padding: 0,
  height: 180,
  borderRadius:30,
  elevation: 5,
  justifyContent: 'center',
  alignContent: 'center',
  // alignItems:'center'
}

})
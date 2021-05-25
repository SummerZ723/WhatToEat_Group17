import React from 'react';
import {Navigation} from 'react-native-navigation';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import {root} from '../App';
import autoBind from 'react-autobind';
import Constants from '../Constants.js';
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import RNBounceable from "@freakycoder/react-native-bounceable";
class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      working: false,
      rememberPassword: false,
    };
    autoBind(this);
  }

  async handleLoginPress() {
    this.setState({
      working: true,
    });

    //pseudo login
    let loginSuccess = false;
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      loginSuccess = true;
    }

    await this.setState({
      working: false,
    });

    if (loginSuccess) {
      await Navigation.setRoot(root);
    }
  }

  handleSkip(){
    Navigation.setRoot(root);
  }

  handleSignin(){
    Navigation.push('loginStack', {
      component: {
        name: 'Signin',
        // passProps: {
        //   searchFood: this.state.showList[1]
        // }
      },
    });
  }

  handleUsernameInput(username) {
    this.setState({
      username: username,
    });
  }

  handlePasswordInput(password) {
    this.setState({
      password: password,
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor={Constants.themeColor} />
          <View
            style={styles.rect}
            backgroundColor={Constants.themeColor}>
            <View style={styles.headerTexts}>
              <TouchableOpacity style={styles.button2} onPress={this.handleSkip}>
                <Text style={styles.skip}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.logoColumn}>
              <View style={styles.logo}>
                  <Image style={{width:240, height:240}} source={require('../assets/logo2.png')}></Image>
              </View>
              <View style={styles.form}>
                <View style={styles.usernameColumn}>
                  <View style={styles.username}>
                    <Image source={require('../assets/user.png')} style={styles.icon2}></Image>
                    <TextInput
                      onChangeText={this.handleUsernameInput}
                      placeholder="User Name"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.usernameInput}
                    />
                  </View>
                  <View style={styles.password}>
                    <Image source={require('../assets/lock.png')} style={styles.icon2}></Image>
                    <TextInput
                      onChangeText={this.handlePasswordInput}
                      placeholder="Password"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={true}
                      style={styles.usernameInput}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={this.handleLoginPress}
                  style={styles.button}>
                  <Text style={styles.text2}>Login</Text>
                </TouchableOpacity>
                <View style={styles.passwordColumn} >
                  <Text style={{marginRight:10 , fontSize: 15, color: 'white'}}>Remember password?</Text> 
                  <BouncyCheckbox
                    size={20}
                    fillColor="#FF931E"
                    unfillColor="#FFFFFF"
                    // iconStyle={{ borderColor: "red" }}
                    onPress={(isChecked: boolean) => this.setState({rememberPassword: isChecked})}
                  />
                </View>
              </View>
            </View>
            <View style={styles.logoColumnFiller} />
            <View style={styles.footerTexts}>
              <TouchableOpacity onPress={this.handleSignin} style={styles.button2}>
                <Text style={styles.createAccount}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2NeedHelp}>
                <Text style={styles.createAccount}>Can't login?</Text>
              </TouchableOpacity>
            </View>
          </View>
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  background: {
    flex: 1,
  },
  rect: {
    flex: 1,
  },
  rect_imageStyle: {},
  logo: {
    height: 160,
    marginBottom: 40,
    alignSelf:'center'
  },
  endWrapperFiller: {
    flex: 1,
  },
  text3: {
    color: 'rgba(255,255,255,1)',
    fontSize: 36,
    marginBottom: 4,
  },
  rect7: {
    height: 8,
    backgroundColor: '#25cdec',
    marginRight: 13,
  },
  text3Column: {
    marginBottom: 6,
    marginLeft: 2,
    marginRight: -10,
  },
  form: {
    height: 230,
    marginTop: 59,
  },
  username: {
    height: 59,
    backgroundColor: 'rgba(251,247,247,0.25)',
    borderRadius: 30,
    flexDirection: 'row',
  },
  usernameInput: {
    fontSize: 16,
    height: 40,
    color: 'rgba(255,255,255,1)',
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 9,
  },
  password: {
    height: 59,
    backgroundColor: 'rgba(253,251,251,0.25)',
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 27,
  },
  icon2: {
    width: 25,
    height:25,
    marginLeft:20,
    marginRight: 0,
    alignSelf: 'center',
  },
  passwordColumn: {
    flexDirection: 'row',
    marginLeft:120,
    marginTop: 10,
    marginBottom: 15,
  },
  button: {
    marginTop:18,
    height: 59,
    backgroundColor: '#FF931E',
    borderRadius: 30,
    justifyContent: 'center',
  },
  text2: {
    fontFamily:'Ubuntu-Bold',
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
    alignSelf: 'center',
  },
  logoColumn: {
    marginTop: 100,
    marginHorizontal: 40
  },
  logoColumnFiller: {
    flex: 1,
  },
  footerTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 14,
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36,
  },
  headerTexts: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 36,
  },
  button2: {
    height: 25,
  },
  button2NeedHelp: {
    height: 20,
  },
  createAccount: {
    fontFamily:'Ubuntu-Bold',
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
  },
  skip: {
    fontFamily:'Ubuntu-Bold',
    fontSize: 22,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default LoginPage;

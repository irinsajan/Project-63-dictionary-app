import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import dictionary from './database';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      text:'',
      word: '',
      type: '',
      definition: ''
    }
  }

  getWord = (text) => {
    var text = text.toLowerCase();
    try{
      var word = dictionary[this.state.text]["word"];
      var type = dictionary[this.state.text]["lexicalCategory"];
      var definition = dictionary[this.state.text]["definition"];
      this.setState({
        word: word,
        type: type,
        definition: definition
      });
   }
   catch(err){
     alert("Word not available")
     this.setState({
       text:''     
     })
   }
  }

  

  render(){
    
    return(
      <SafeAreaProvider>
        <View>
          <Header 
            backgroundColor='purple' 
            centerComponent={{text:"Pocket Dictionary", style: {fontSize:20, color: 'pink'}}}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Type the word here"
            onChangeText={(text) => {
              this.setState({
                text: text,
                word: '',
                type:'',
                definition: ''
              })
            }}  
            value={this.state.text}
          />
          <TouchableOpacity style={styles.button}
            onPress={() => {this.getWord(this.state.text)}}>
            <Text style={{textAlign:'center'}}>Search</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>
              Word: {""}
            </Text>
            <Text style={{fontSize:20}}>
              {this.state.word}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>
              Type: {""}
            </Text>
            <Text style={{fontSize:20}}>
              {this.state.type}
            </Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={styles.text}>
              Definition: {""}
            </Text>
            <Text style={{fontSize:20}}>
              {this.state.definition}
            </Text>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: 250,
    borderWidth: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    textAlign: 'center'
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 50,
    backgroundColor: 'lightblue'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange'
  }
})
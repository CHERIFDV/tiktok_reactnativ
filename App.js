import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity,Alert,Image} from 'react-native';

import Routes from './navigation/routes';


// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
 
export default function App() {
   
  return (
    <View style={{
      flex:1,     
    }}>
    <Routes/>
    </View>
  );
}

const styles = StyleSheet.create({

});

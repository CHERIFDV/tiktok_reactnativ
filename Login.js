import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity,Alert,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import { loginWithEmail } from './Firebase/Firebase.JS';
// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function Login({navigation}) {
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const [loading, setLoading] = useState(true);
  const saveValueFunction=() => {
      AsyncStorage.setItem('email', username.trim());
  };
  return (
    <View style={{
      flex:1,  
      alignItems:"center",
      justifyContent:"center",
      width:"100%",    
    }}>
    <Image
        style={{
          width:100,
          height:100,
          marginBottom:10, 
         backgroundColor:"red"
        }}
        source={{
          uri: 'https://cdn.dribbble.com/users/137192/screenshots/3970444/fireblue.gif',
        }}
      />
      <TextInput style={{
        width:"80%",
        height:50,
        marginBottom:10, 
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.5)",
        borderRadius:50,
        padding:10,
      }}
      onChangeText={(text)=>setusername(text)}
      />
      <TextInput secureTextEntry style={{
        width:"80%",
        height:50,
        marginBottom:10,
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.5)",
        borderRadius:50,
        padding:10,
      }}
       onChangeText={(text)=>setpassword(text)}
       />
       <Spinner
          //visibility of Overlay Loading Spinner
          visible={!loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      <TouchableOpacity style={{
        borderWidth:2,
       borderColor:"rgba(0,0,0,0.5)",
        borderRadius:50,
        padding:10,
        width:"80%",
        height:50,
        alignItems:"center",
        justifyContent:"center"
      }}
      onPress={ 
        
        async()=>{
      setLoading(false)
    try {
       await loginWithEmail(username.trim(), password.trim());
        saveValueFunction(),
        setLoading(true)
        navigation.navigate('Accueil')
    } catch (error) {
      setLoading(true)
      console.log("error")
     Alert.alert("password or email not correct")
    }
      }

      }
      activeOpacity={1}
      >
      <Text style={{
      }}
      >Login</Text>
      
      </TouchableOpacity>
      <TouchableOpacity style={{
        padding:10,
        width:"80%",
        height:50,
        alignItems:"center",
        justifyContent:"center"
      }}
      onPress={()=>{
       navigation.navigate('Register')
      }
      }
      activeOpacity={1}
      >
      <Text style={{
      }}
      >Create compte</Text>
      </TouchableOpacity>
      <Text style={{}}>
       
       
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

});

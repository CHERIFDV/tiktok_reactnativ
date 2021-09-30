import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,FlatList,TextInput,Dimensions,TouchableOpacity,Alert,Image,ScrollView,Button,Platform} from 'react-native';
import { Video } from 'expo-av'

import { uploadImageAsync } from './Firebase/Firebase.JS';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
///ico
import { MaterialIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
// You can import from local files
import AssetExample from './components/AssetExample';
import Spinner from 'react-native-loading-spinner-overlay';
// or any pure javascript modules available in npm
export default function Addvideos({navigation}) {
  const [email,setemail]=useState("")
 const getValueFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('email').then(
      (value) =>
        //AsyncStorage returns a promise so adding a callback to get the value
        setemail(value)
      //Setting the value in Text
    );
  };
 getValueFunction()
   const [videoname,setvideoname]=useState("")
  const [description,setdescription]=useState("")
  const [result,setresult]=useState("")
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {

      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }


    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    setresult(result);
   
  };
 const onupload=async()=>{
   console.log("go")
   setLoading(false)
 if (!result.cancelled) {
     
     setLoading(await uploadImageAsync(result.uri,videoname,description,email))
     Alert.alert("file uploded");
     navigation.navigate('Accueil')
    }
 }

  return (
    <View style={{flex:1,  
      alignItems:"center",
      justifyContent:"center",
      width:"100%"}}>
      <View style={{
      alignItems:"center",
      justifyContent:"center" ,padding:100 }}>
        <MaterialIcons name="add-a-photo" onPress={pickImage} size={50} color="black" />
      </View>
    <View style={{justifyContent:"center",}}>
     <Spinner
          //visibility of Overlay Loading Spinner
          visible={!loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
     <View style={{ flexDirection: 'row'}}>
     <Text style={{padding:5, width:120,}}>Title of video</Text>
     <TextInput  style={{
         width:200,
        height:50,
        marginBottom:10,
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.5)",
        borderRadius:50,
        padding:10
        }}
       onChangeText={(text)=>setvideoname(text)}
       /></View>
        <View style={{ flexDirection: 'row'}}>
        <Text style={{ width:120,padding:5}} >Description</Text>
         <TextInput  style={{
        width:200,
        height:50,
        marginBottom:10,
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.5)",
        borderRadius:50,
        padding:10,
      }}
       multiline={true}
    
       onChangeText={(text)=>setdescription(text)}
       />
    </View>
     <TouchableOpacity style={{
        padding:10,
        width:320,
        height:50,
        alignItems:"center",
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.5)",
        borderRadius:50,
        justifyContent:"center"
      }}
      onPress={()=>{ onupload()
      }
      }
      activeOpacity={1}
      >
      <Text style={{
      }}
      >Add video</Text>
      </TouchableOpacity>
   </View>
 
</View>
  );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({

  
 
});


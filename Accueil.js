import React,{useState,useEffect,Fragment} from 'react';
import { Text, View, StyleSheet,FlatList,TextInput,RefreshControl,SafeAreaView,Dimensions,TouchableOpacity,Alert,Image,ScrollView,Button,Platform} from 'react-native';
import { Badge } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { allvideos,dislick,like,isliked,isdiliked} from './Firebase/Firebase.JS';
import styled from "styled-components/native";
import Constants from 'expo-constants';
//Import React Native Video to play video
 import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
///ico
import { MaterialIcons,FontAwesome5, AntDesign} from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// You can import from local files
import AssetExample from './components/AssetExample';
import SectionListInFocus from '@reactly/react-native-autoplay-scroll-video'
// or any pure javascript modules available in npm


import { Card } from 'react-native-paper';

export default function Accueil({navigation}) {
  const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const [refreshing, setRefreshing] =useState(false);

const onRefresh = React.useCallback(() => {
    setRefreshing(true);
 
    console.log("refrech")
    wait(2000).then(() => setRefreshing(false));
  }, []);
const dislike=async(name)=>{
  if(red!="red"){
    if(await dislick(name)){
     setred("red")
    }else{
      console.log("alredy")
Toast.show({
    type: 'error',
    position: 'bottom',
      text1: 'already your dislike this video👋',
      visibilityTime: 500,
    });

    }
  }
  }
  const like1=async(name)=>{
  if(green!="green"){
    if(await like(name)){
     
    setgreen("green")
    }else{
      console.log("alredy")
Toast.show({
   position: 'bottom',
      text1: 'already your like this video👋',
      visibilityTime: 500,
    });

    }
    
  }
  }
const [red,setred]=useState("black")

const [green,setgreen]=useState("black")
  const [videos,setvidoes]=useState("")
 const [finallike,setfinallike]=useState([])
const [finaldlike,setfinaldlike]=useState([])

  useEffect(() => {
     (async () => {
     
      

   setvidoes(await allvideos())
  
     
    })();
  }, [red,green,refreshing]);



  
  var vedios=null
  if(videos!=null){
   vedios=Object.keys(videos).map((keyName,value)=> {
     var like=false;
     
     console.log(videos)
 
   
     

     return(
      <View style={{
        flex:1,
        height:"100%",
        borderColor:"black",
        borderWidth: 2,
       marginBottom:10
      }}>

    <VideoPlayer
    style={styles.backgroundVideo}
     videoProps={{
    shouldPlay: false,
    resizeMode: Video.RESIZE_MODE_CONTAIN,
    source: {
      uri: videos[keyName].videourl,
    },
  }}
  repeat={true}
  paused={true}
  
  inFullscreen={true}
/>   
 <View style={{
        flex:1,
        height:"100%",
         flexDirection: 'row',
      }}>
 <View style={{
      flex:1,  
      alignItems:"flex-start",
       paddingTop:40,
     paddingLeft:50,
     paddingBottom:10,
      flexDirection: 'row',
    }}>
      <Badge value={videos[keyName].like} status="success" />
   
  <FontAwesome onPress={()=>{like1(videos[keyName].videoname)}} name="heart" size={24} color={green}  />
    </View>
    <View style={{
      alignItems:"flex-end",
       flexDirection: 'row',
      paddingRight:50,
      paddingTop:40,
      paddingBottom:10
       }}>
  

  <FontAwesome5 onPress={()=>{dislike(videos[keyName].videoname)}}  name="heart-broken"  size={24} color={red} />
  <Badge value={videos[keyName].dislike} status="error" />

    </View>
    
</View>

</View>)
      
    });}

  return (
    <SafeAreaView style={styles.container}>
    
     
    <View style={{flex:1,  }}>
    <View style={{
      flexDirection: 'row',
     
    }}>
   <View style={{
      flex:1,  
      alignItems:"flex-start",
       paddingTop:40,
     paddingLeft:50,
     paddingBottom:10,
   
    }}>
    <Octicons name="person" onPress={()=>navigation.navigate('Profile')}  size={24} color="black" /> 
    </View>
    <View style={{
      alignItems:"flex-end",
      paddingRight:50,
      paddingTop:40,
      paddingBottom:10
       }}>
    <MaterialIcons name="add-a-photo" onPress={()=>navigation.navigate('Addvideo')} size={24} color="black" />
    </View>
      
    </View>
     
    <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
     
    <View >
    
   
      {vedios}
    
  </View>
</ScrollView>
   
</View>
<Toast ref={(ref) => Toast.setRef(ref)} />
  </SafeAreaView>
  );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
 container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  }
 
});
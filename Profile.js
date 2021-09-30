import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,FlatList,ToastAndroid,RefreshControl,SafeAreaView, TextInput,ScrollView,TouchableOpacity,Alert,Image} from 'react-native';
import { Badge } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-community/async-storage';
//Import React Native Video to play video
 import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
///ico
import { MaterialIcons,FontAwesome5, FontAwesome} from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
// You can import from local files
import AssetExample from './components/AssetExample';
import {passwordReset,logout,videosg,dislick,like,isliked,isdiliked} from "./Firebase/Firebase.JS";
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function Profile({navigation}) {

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const [refreshing, setRefreshing] =useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [email,setemail]=useState("")
  
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
  const [green,setgreen]=useState("black")
const [red,setred]=useState("black")

  const getValueFunction = () => {
    AsyncStorage.getItem('email').then(
      (value) =>
        setemail(value)
    );
  };
 getValueFunction()
 
const [videos,setvidoes]=useState("")
  useEffect(() => {
    const v =async()=>{
      const vi=await videosg()
      if(vi!=null){
      setvidoes(vi)
      }
    console.log("upload")
      
  }
 v()

  }, [green,red,refreshing]);

  
  
  var vedios2=null
  if(videos!=null){
   vedios2=Object.keys(videos).map((keyName,value)=> {

     const v=(async ()=>{
   //  setred( await isdiliked(videos[keyName].videoname))
    // setgreen( await isliked(videos[keyName].videoname))
     })
     
    
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

const renderItem = ({ item }) => (
  
  <View style={{ 
       alignItems:"center",
      justifyContent:"center",
      borderWidth: 1,
      borderColor: "#dadce0",
      borderRadius: 6,
      margin:20
    }}>
   <Image style={{
          width:"100%",
          height:200,
          
        }} source={{
          uri: item.img,
        }}/>
   <Text style={{
         padding:20
          
        }} 
         >{item.description}</Text>
      <View style={{ 
       alignItems:"center",
      justifyContent:"center",
      flexDirection: 'row',
      borderWidth: 1,
    borderColor: "#dadce0",
    borderRadius: 6,
    width:"100%"
    }}>
   <Text style={{ marginRight:50
    }} >Like: {item.nblike}</Text>
   <Text>Comments: {item.nbcomments}</Text>
   </View>
  </View>
  );
  return (
    <View style={{
      flex:1,  
      marginTop:50
    }}>


    <View style={{ 
      flexDirection: 'row',
     
    }}>
    <View style={{
      flex:1,  
      alignItems:"center",
      justifyContent:"center",
      
    }}>
      <Image
        style={{
          width:100,
          height:100,
          marginBottom:10, 
         backgroundColor:"red",
         borderRadius:50
        }}
        source={{
          uri: 'https://cdn.dribbble.com/users/137192/screenshots/3970444/fireblue.gif',
        }}
      />
       
    </View>
    <View style={{
      flex:1,  
      justifyContent:"center",
    }}>
      <Text numberOfLines={1} >Email:{email}</Text>
    </View>
    </View>
    <View style={{
      justifyContent:"center",
       alignItems:"center",
    }}>
 <TouchableOpacity style={{
        padding:10,
        width:320,
        height:50,
        alignItems:"center",
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.5)",
        borderRadius:50,
        justifyContent:"center",
        margin:10
      }}
      onPress={()=>{ logout();
      ToastAndroid.show('Logout', ToastAndroid.SHORT);
      navigation.navigate('Login')
      }
      }
      activeOpacity={1}
      >
      <Text style={{
      }}
      >Logout</Text>
      </TouchableOpacity>
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
        onPress={()=>{ passwordReset(email);
        ToastAndroid.show('Logout ,check your email to reset your password', ToastAndroid.SHORT);
        navigation.navigate('Login')
      }
      }
      activeOpacity={1}
      >
      <Text style={{
      }}
      >Reset Password</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
       <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
   
      {vedios2}
       </ScrollView>
    </SafeAreaView>

      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
 
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  }
});

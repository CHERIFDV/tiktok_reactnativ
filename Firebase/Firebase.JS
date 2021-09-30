import * as firebase from 'firebase';
import 'firebase';


// Initialize Firebase App
const firebaseConfig = {
       apiKey: "AIzaSyBE_RU6HB6VGiY-6-Z6n-2Mbq-gm41-a0A",
    authDomain: "pikpok-aa8e1.firebaseapp.com",
    databaseURL: "https://pikpok-aa8e1-default-rtdb.firebaseio.com",
    projectId: "pikpok-aa8e1",
    storageBucket: "pikpok-aa8e1.appspot.com",
    messagingSenderId: "1071022650992",
    appId: "1:1071022650992:web:dfbbf7953aa286705da6b5",
    measurementId: "G-VLDDDN6TMS"


};



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
////firebase auth
export const auth = firebase.auth();
export const loginWithEmail = (email, password,username) =>auth.signInWithEmailAndPassword(email, password);


export const logout = () => auth.signOut();
export const passwordReset = (email) => auth.sendPasswordResetEmail(email);

////firebase storage
var storage = firebase.storage();
export const defaultStorageBucket=()=>storage.ref().child('videos').listAll().then(function(res) {
  res.prefixes.forEach(function(folderRef) { });
  res.items.forEach(function(itemRef) {// All the items under listRef.
  });
}).catch(function(error) {
  // Uh-oh, an error occurred!
});
/*/
 itemRef.getDownloadURL().then(function(url) { 
     console.log(url)
   }) 
/*/
var database = firebase.database();
export const  uploadImageAsync =async(uri,name,description,email)=> {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  
  console.log("uloded")
  var user = await firebase.auth().currentUser;
  const ref = firebase.storage().ref().child("videos/"+name);
  const snapshot = await ref.put(blob);
  // We're done with the blob, close and release it
 const videourl =await snapshot.ref.getDownloadURL()
firebase.database().ref('videos/' +name).set({
        videoname: name,
        description:description,
        like: 0,
        dislike:0,
        videourl : videourl,
        user:user.email
  });
 blob.close();
   return true
}
/////firebase realtime
  
export const allvideos = async ()=>{
 const vedios=await database.ref('videos/').once('value');
console.log("allvideos")
return vedios.val()
}
  export const registerWithEmail = (email, password) =>{
  auth.createUserWithEmailAndPassword(email,password);

  console.log(email)

}
export const dislick = async (name)=>{

  var user = await firebase.auth().currentUser;
const videos=await  database.ref('/dislik').orderByChild('id').equalTo(user.uid+name).once('value');
console.log("dislnjkkljnlik");
if(videos.val()==null){
  console.log("send");
  firebase.database().ref('dislik/' + user.uid+name).set({
        videoname: name,
        id:user.uid+name
        });
         const video=await  database.ref('videos/'+name).once('value');
      firebase.database().ref('videos/'+ name).update({'dislike': (video.val().dislike+1)});
      return true
}else{
  console.log(" not send");
  return false
  
}
}
export const like = async (name)=>{
  var user = await firebase.auth().currentUser;
const videos=await  database.ref('/like').orderByChild('id').equalTo(user.uid+name).once('value');
if(videos.val()==null){
 
  firebase.database().ref('like/' + user.uid+name).set({
        videoname: name,
        id:user.uid+name
        });
         const video=await  database.ref('videos/'+name).once('value');
      firebase.database().ref('videos/'+ name).update({'like': (video.val().like+1)});
  return true
}else{
   return false
  console.log(" not send");
}
}
export const videosg = async ()=>{
  
  var user = await firebase.auth().currentUser;
 const videos=await  database.ref('videos').orderByChild('user').equalTo(user.email).once('value');

if(videos==null){

}else{
  console.log(videos.val())
return videos.val()
}
}

export const isliked = async (name)=>{
var user = await firebase.auth().currentUser;
const videos=await  database.ref('/like').orderByChild('id').equalTo(user.uid+name).once('value');
if(videos.val()==null){

 return "black"
}else{

 return "green"
}
}
export const isdiliked = async (name)=>{
  console.log("dslike")
var user = await firebase.auth().currentUser;
const videos=await  database.ref('/dislik').orderByChild('id').equalTo(user.uid+name).once('value');
if(videos.val()==null){

 return "black"
}else{

 return "red"
 
}
}/*/
export const isdiliked = async (name)=>{
  console.log("dslike")
var user = await firebase.auth().currentUser;
const videos=await  database.ref('/dislik').orderByChild('id').equalTo(user.uid+name).once('value');
if(videos.val()==null){

 return "black"
}else{

 return "red"
 
}
}
/*/

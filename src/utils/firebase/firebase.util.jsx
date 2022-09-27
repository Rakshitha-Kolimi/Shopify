import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,
onAuthStateChanged} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCB0A_ogpo-9gE-IvgrM-U8wlxEKQ0kpiU",
    authDomain: "shopify-db-bddbb.firebaseapp.com",
    projectId: "shopify-db-bddbb",
    storageBucket: "shopify-db-bddbb.appspot.com",
    messagingSenderId: "561202163373",
    appId: "1:561202163373:web:227b268ce81724cee8e024"
  };
  
  // Initialize Firebase
  export const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });
 export const auth = getAuth();
 export const signInWithGooglePopup= () => signInWithPopup(auth,googleProvider);
 export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async(userAuth,additionalInfo={}) => {
  if(!userAuth) return;
  const userDocRef= doc(db,'users',userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)
  
  //if user exists - retreive data else create the data 

  if(!userSnapshot.exists()){
    const {displayName, email}= userAuth;
    const createdAt = new Date();

    try{
        await setDoc(userDocRef,{
            displayName, email,createdAt,...additionalInfo
        })
    }
    catch (error){ 
        console.log("Cannot set in document", error.message)
    }
  }
  
  return userDocRef;

}
export const createAuthUserWithEmailAndPassword = async(email,password) =>{
  if(!email||!password)
  {
    return;
  }
  
  return  createUserWithEmailAndPassword(auth,email,password)
  

}
export const signInAuthUserWithEmailandPassword = async(email,password) =>{
  if(!email||!password)
  {
    return;
  }
  
  return  signInWithEmailAndPassword(auth,email,password)
  

}
export const signOutUser = async()=> await signOut(auth);
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth,callback)
}
export const addCollectionAndDocuments =async (collectionKey,objects)  => {
const CollectionRef = collection(db,collectionKey);
const batch = writeBatch(db);
objects.forEach((object)=>{
  const docRef = doc(CollectionRef,object.title.toLowerCase());
  batch.set(docRef,object);
})
await batch.commit();
} 
export const getCategoriesAndDocuments = async () => {
  const CollectionRef = collection(db,'categories');
  const q = query(CollectionRef);
  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc,docSnapshot)=>{
   const{title,items} = docSnapshot.data();
   acc[title.toLowerCase()] = items;
   return acc;
  },{})

  return categoryMap;
}
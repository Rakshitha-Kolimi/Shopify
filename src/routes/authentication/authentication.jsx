import {auth,createUserDocumentFromAuth} from '/home/kolimi/shopify/src/utils/firebase/firebase.util.jsx';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up/sign-up.component';
import SignInForm from '../../components/sign-in/sign-in.component';
import '/home/kolimi/shopify/src/routes/authentication/authentication.style.css';
const Authentication = () =>
{

    // useEffect(() => {async function fetchData()
    // {
    // const response = await getRedirectResult(auth);
    // console.log(response);
    // }}
    // ,[]);


    // useEffect(async () =>
    //     {
    //     const response = await getRedirectResult(auth);
    //     console.log(response);
    //     }
    //     ,[]);


    useEffect(()=>{
        async function fetchData(){
            const response = await getRedirectResult(auth);
            if(response){
                await createUserDocumentFromAuth(response.user);
            }
        }
        fetchData();
    },[])

   

    // const logGoogleRedirectUser = async () => 
    // {
    //     const {user} = await signInWithGoogleRedirect();
    //     console.log({user})
    // }
   
    return (
        <div className='authentication-container container'>
            <div className='row'>
                <div className='col'>
            <SignInForm/>
            </div>
            <div className='col'>
            <SignUpForm/>
            </div>
            </div>
        </div>
    )
}
export default Authentication;
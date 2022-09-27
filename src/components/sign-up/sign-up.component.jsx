import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import '/home/kolimi/shopify/src/components/form-input/form-input.styles.scss';
import '/home/kolimi/shopify/src/components/sign-up/button.styles.scss';
import Button from "../button/button.component";
//import { UserContext } from "../../context/user.context";
const defaultFormFields = {
    displayName : '',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () =>
{
   
    const [formFields,setFormFields] = useState(defaultFormFields);
    //const {setCurrentUser} = useContext(UserContext)
    const {displayName, email,password,confirmPassword} = formFields;
    const resetFormfields = ()=>{
         setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        if (password!==confirmPassword)
       {alert("password Did Not Match") 
        return;}
        try
        {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})
            //setCurrentUser(user);
             resetFormfields();
        }
    catch(error){
        if(error.code==='auth/email-already-in-use')
        alert("Email already exists");
        console.log(error);
    }   
    }
    const OnhandleChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }
return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign Up with Email and Password</span>
        <form onSubmit={handleSubmit}>
            <FormInput  label="Name: " type="text" required onChange={OnhandleChange} name="displayName" value={displayName}/>
            <FormInput  label="Email: " type="email" required onChange={OnhandleChange} name="email" value={email} />
            <FormInput  label="Password: " type="password"  required onChange={OnhandleChange} name="password" value={password}/>
            <FormInput  label="Confirm Password: " type="password" required onChange={OnhandleChange} name="confirmPassword" value={confirmPassword}/>    
            <Button type="submit"> SIGN UP</Button>
        </form>
    </div>
)
}
export default SignUpForm;
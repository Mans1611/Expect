import axios from "axios";
import Axios from "../../Axios/axios";

const  CreateNewAdmin = async(userName,password,repass,adminKey)=>{

    // check the inputs are not empty
    if(userName === '' || password === '' || repass === '' || adminKey === '' )
        return "Check all the inputs fields";

    // check the inputs are defiend
    if(!userName  || !password || !repass  || !adminKey)
        return "Check all the inputs fields";
    
    // check the inputes matches
    if(password !== repass)
        return "Password do not match";
    try{
        const response = await axios.post('/admin/signup',{
            userName,
            password,
            adminKey
        })
        return response;
    }
    
    catch(err){
        console.log(err);
    }

}

const signInValidation = async (userName,password,adminKey)=>{
    // check the inputs are not empty
    if(userName === '' || password === ''  || adminKey === '' )
    return "Check all the inputs fields";

    // check the inputs are defiend
    if(!userName  || !password ||  !adminKey)
    return "Check all the inputs fields";

   try{
    const response = await Axios.post('/admin/login',{userName,password,adminKey});
        return response;
   }
   catch(err){
    console.log(err);
   }
    
}

export {CreateNewAdmin,signInValidation}; 
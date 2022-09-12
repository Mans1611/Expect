import React, { useReducer } from 'react'
import Axios from '../../../Axios/axios';
import '../feedback.scss';
import { initObject, reduceFn } from '../ReducerFeedback';
import {useNavigate} from 'react-router-dom';
import { supportChoices } from '../../../adminPage/component/FeedbackComp/supportChoises';
const Support = () => {
    const [state,dispatch] = useReducer(reduceFn,initObject);
    document.title = "Support & Help";
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const problemType = document.getElementById('support-problem').value;
        const description = document.getElementById('description').value;

        if(email.trim() === '' || description.trim() === "" || !email || !description || !problemType){
           return  dispatch({type : "empty inputs"})
        }

        console.table(email,problemType,description)
        
        try{
            const {data, status} = await Axios.post('/feedback/postfeedback',{
                email,
                problemType,
                description,
                helpSupport : true
            });

            if(status === 200)
            {
                dispatch({type : 'success'});
                
                setTimeout(()=>{
                   // navigate('/welcome'); 
                },2000)
            }

            console.log(data.msg);

        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='feedback-page'>
        <div className="header">
            <h1 className='helpTitle'> Support & Help</h1>
        </div>
        <h1>Have Any Problem with the game  Send it and we will help you as soon as possible</h1>
        <div className="formContainer">
            <form>
                <div className="inputContainer">
                    <label htmlFor="email">Email</label>
                    <input required placeholder='Enter Your Email' type="email"  id="email" />
                </div>

                <div className="inputContainer">
                    <label htmlFor="support-problem"> Select Your issue</label>
                    <select required name="problem" id="support-problem">
                        <option disabled>Issue Type</option>
                        {
                            supportChoices.map((option,index)=><option key={index}>{option}</option>)
                        }
                    </select>
                </div>
                <div className="inputContainer">
                    <label htmlFor="feedback">Description</label>
                   <textarea  required placeholder='Describe your problem with details please, to be able to help you.' id="description"></textarea>
                </div>

                {state.showMsg && 
                <div className="msgContaienr">
                    <div className={`msg ${state.color === 'red' ? 'red' : 'green'}`}>{state.msg}</div>
                </div>

                }
                <div className="button-wrapper">
                    <button onClick = {handleSubmit} className="submit">Send</button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Support;
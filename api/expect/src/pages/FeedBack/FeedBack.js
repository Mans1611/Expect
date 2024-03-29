import React, { useReducer } from 'react'
import Axios from '../../Axios/axios';
import './feedback.scss';
import { initObject, reduceFn } from './ReducerFeedback';
import { useNavigate } from 'react-router-dom';
const FeedBack = () => {

    // const navigate = Navigate();

    document.title = "FeedBack";
    const [state,dispatch] = useReducer(reduceFn,initObject)

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('feedback').value;

        if(name.trim() === '' || description.trim() === "" || !name || !description){
           return  dispatch({type : "empty inputs"})
        }

        
        try{
            const {data, status} = await Axios.post('/feedback/postfeedback',{
                name,
                description
            });

            if(status === 200)
            {
                dispatch({type : 'success'});
                
                setTimeout(()=>{
                    navigate('/welcome'); 
                },2000)
            }


        }catch(err){
            console.log(err);
        }
    }


  return (
    <div className='feedback-page'>
        <div className="header">
            <h1>Send to us your feedback about <span> Expect </span></h1>
        </div>


        <div className="formContainer">
            <h1 className="formtitle">Your Feedback is <span> appreciable </span> to us</h1>
            <form>
                <div className="inputContainer">
                    <label htmlFor="name">Name</label>
                    <input onFocus={()=>dispatch({type : 'remove msg'})}  placeholder='Enter Your Name (Optional)' type="string"  id="name" />
                </div>
                
                <div className="inputContainer">
                    <label htmlFor="feedback">FeedBack</label>
                   <textarea onFocus={()=>dispatch({type : 'remove msg'})} required placeholder='Tell us how can we improve Expect' id="feedback"></textarea>
                </div>

                {state.showMsg && 
                <div className="msgContaienr">
                    <div className={`msg ${state.color === 'red' ? 'red' : 'green'}`}>{state.msg}</div>
                </div>

                }
                <div className="button-wrapper">
                    <button onClick = {handleSubmit} className="submit">Send Feedback</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default FeedBack
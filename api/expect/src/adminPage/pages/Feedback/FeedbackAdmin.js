import './feedbackAdmin.scss';
import React, { useEffect, useReducer, useState } from 'react'
import { AdminContext } from '../../Context/ProtectedAdmin';
import Axios from '../../../Axios/axios';
import UserIssue from '../../component/FeedbackComp/UserIssue';
import { initState, reduceFn } from './feedbackReducer';
import { supportChoices } from '../../component/FeedbackComp/supportChoises';

const FeedbackAdmin = () => {
    const {token} = AdminContext();
    const [feedbacks,setFeedBacks] = useState([]);
    const [filter,setFilter] = useState('all');

    const [pageState,dispatch] = useReducer(reduceFn,initState);
    useEffect(()=>{
        let isSubscribe = true;
        
        const fetchFeedbacks = async(required)=>{
            try{
                const {data,status} = await Axios.get(`/feedback/${required}`,{
                    headers: {
                        token
                    }
                }) 
                console.log(data.feedbacks);
                if(isSubscribe)
                    setFeedBacks(data.feedbacks); 
                
            }catch(err){
                console.log(err);
            }
        }

        if(pageState.page === 'Feedback'){
            fetchFeedbacks('getfeedbacks');
        }
        else{
            fetchFeedbacks('getSupport');
        }

        ()=> isSubscribe = false;

    },[pageState.page])

    useEffect(()=>{
        let isSubscribe = true
        const filterSupport = async()=>{

            try{
                const {data} = await Axios.get(`/feedback/getSupport/${filter}`,
                {
                    headers: {
                        token
                    }}
                    );
                    
                if(isSubscribe)
                    setFeedBacks(data.feedbacks)
            }catch(err){
                console.log(err);
            }
        }
        if(filter !== 'all')
            filterSupport();

    },[filter])
    


  return (
    <div className='feedbackAdmin-page'>
        <div className="header">
            <h1>{pageState.page}</h1>
        </div>

        <div className="PageButtons">
            <button className = {`${pageState.selected === 'first' ? 'selected': ''}`} onClick ={()=> dispatch({type : "changeToFeedback"})}>Feedback</button>
            <button className = {`${pageState.selected === 'second' ? 'selected': ''}`} onClick ={()=> dispatch({type : "changeToSupport"})}>Help & Support</button>
        </div>
        <div className="feedbacks-container">
            <div className="select-container">
                {
                    pageState.showVerify && 
                        <select onChange={(e)=> setFilter(e.target.value)} name="" id="filter">
                            <option value={"all"} >All</option>
                            {supportChoices.map((choice,index)=> <option key={index}> {choice}</option>)}
                        </select>
                }

            </div>

            {   
                feedbacks.length === 0 ? <div className="noContent">NO FeedBack Yet</div>
                :
                feedbacks.map((feedback,index)=>  <UserIssue support = {pageState.showVerify}  feedback ={feedback} key={index}/>) 
            }
           
        </div>

    </div>
  )
}

export default FeedbackAdmin
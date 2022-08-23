import React, { useReducer, useState } from 'react'
import './addnews.scss';
import axios from 'axios';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import AddNewsComponent from './AddNewsComponent';
import AddPlayerToExpect from './AddPlayerToExpect';

const AddNews = () => {
   
  const initstate = {
    showNews : false,
    showAddPalyer : false,
    selected :null
    }
  const ShowReduce = (state,action)=>{
    switch(action.type){
      case 'showNews' :
        return {showNews:true,showAddPalyer:false,selected : 1};
  
      case 'showAddPlayer' : 
          return {showNews : false, showAddPalyer:true, selected : 2};
      
      default:
        return {showNews : false, showAddPalyer:false ,selected : null}
    }
  }

  const [show,setShow] = useReducer(ShowReduce,initstate);

  return (
    <div className='addNews-Container'>
      <div className="buttonWrapper">
        <button className={show.selected === 1 ? 'selected' : null} onClick={()=> setShow({type : 'showNews'})}>Add News</button>
        <button className={show.selected === 2 ? 'selected' : null}  onClick={()=> setShow({type : 'showAddPlayer'})}>Add Player To Expect</button>
      </div>
        <div className="form-container">
            {show.showNews && <AddNewsComponent/>}
           {show.showAddPalyer &&  <AddPlayerToExpect/>}
        </div>
    </div>
  )
}

export default AddNews
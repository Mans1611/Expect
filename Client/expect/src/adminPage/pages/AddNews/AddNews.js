import React, { useState } from 'react'
import './addnews.scss';
import axios from 'axios';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';

const AddNews = () => {
    const [title,setNewsTitle] = useState('');
    const [img,setNewsImg] = useState('');
    const [paragraph,setNewsDetails] = useState('');
    const [loading,setLoading] = useState(false);
    const handlePost = async (e)=>{
        e.preventDefault();
        try{
            setLoading(true)
            const response = await axios.post('/news/addnews',{
                title,
                img,
                paragraph
            })
            setLoading(false);
            console.log("done");
        }catch(err){
            console.log(err);
        }

    }
  return (
    <div className='addNews-Container'>
        <div className="form-container">
            <h1 className='addNewsTitle'> Add News </h1>
            <form>
                {
                    loading ? <SmallLaoding/> :
                 <>
                    <div className="input-Container">
                        <label htmlFor="newsTitle">
                            News Title
                            <input onChange={(e)=>setNewsTitle(e.target.value)} id = 'newsTitle' type="text" placeholder='Enter News Title' />
                        </label>
                    </div>
                    <div className="input-Container">
                        <label htmlFor="newsPhoto">
                            News Link
                            <input onChange={(e)=>setNewsImg(e.target.value)} id='newsPhoto' type="text" placeholder='Enter Link Of The Photo' />
                        </label>
                    </div>
                    
                    <div className="input-Container">
                        <label htmlFor="newsTextArea">
                            News Details
                            <textarea onChange={(e)=>setNewsDetails(e.target.value)} id='newsTextArea'></textarea>
                        </label>
                    </div>
                    <div className="input-Container">
                        <button onClick={handlePost} className= 'addNewsButton' type="submit">Add News</button>
                    </div>
                 </>   

                }

            </form>
        </div>
    </div>
  )
}

export default AddNews
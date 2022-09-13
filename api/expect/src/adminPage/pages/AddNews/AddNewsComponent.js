import React, {useState,useEffect} from 'react'


const AddNewsComponent = ({setLoading}) => {

    const [title,setNewsTitle] = useState('');
    const [img,setNewsImg] = useState('');
    const [paragraph,setNewsDetails] = useState('');

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
      <>
      <h1 className='addNewsTitle'> Add News </h1>
            <form>
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
            </form>
 </>
  )
}

export default AddNewsComponent
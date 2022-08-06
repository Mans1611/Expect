import { useState } from "react"
import './createTeamForm.scss';
const ClipBoardCopy = ({text})=>{
    const [isCopied,setIsCopied] = useState(false);


    const CopyToClipBoard = async ()=>{
        if('clipboard' in navigator)
            return await navigator.clipboard.writeText(text); 
    }

    const handleCopy = async (e)=>{
        e.preventDefault();
        setIsCopied(true);
        try{
            await CopyToClipBoard(text);
            setTimeout(()=>{
                setIsCopied(false)
            },1900)
        }catch(err){
            console.log(err);
        }

    }
    return(
        <>
            <div >
                <h1 className="invitation">Copy The Code And Send To your Friend</h1>
            </div>
            <div className="code-Wrapper">
                <input value = {text}className="codeCotenet" readOnly / >
                <button className= {`copyButton ${isCopied ? 'copied':null}`} onClick={handleCopy}>{isCopied ? 'Copied!' : 'Copy'}</button>
            </div>
        </>
    )

} 


export default ClipBoardCopy;
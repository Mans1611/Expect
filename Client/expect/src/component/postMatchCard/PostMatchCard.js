import './postMatchCard.scss';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import PublicIcon from '@mui/icons-material/Public';
const PostMatchCard = () => {
    return ( 
        <div className="postMatchCard">
            <div className="matchHeader">
                <div className="country">
                    <img className='countryImage' src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/640px-Flag_of_France.svg.png" alt="" />
                    <label  className='countryLable'>France</label>
                </div>
                <div className="result">
                    <p>Final Result</p>
                    <span>3 - 1</span>
                </div>
                <div className="country">
                    <img className='countryImage' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png" alt="" />
                    <label  className='countryLable'>Germany</label>
                </div>
            </div>
           <div className="userExpect">
                <h3 className="yourExpect">YourExpect</h3>
                <p>Winner:France</p>
                <p>Result:4-1</p>
                <p>Your Match Points:7 Pts</p>
           </div> 
           <div className="showFullWrapper">
                <button className="showFull">Show Full Expect</button>
           </div>
        </div>
     );
}
 
export default PostMatchCard;
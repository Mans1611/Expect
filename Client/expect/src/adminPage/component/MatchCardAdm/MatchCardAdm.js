
import '../../../component/matchcards/matchcard.scss' ;
const MatchCardAdm = ({match}) => {
    return ( 
        <div className="matchCard dark">
            <div className="matchcardHeader">
                <div className="matchCardCountry"> {/* country1.*/ }
                    <img src={match.firstCountry.logo} alt="" className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.firstCountry.countryName}</span>
                </div>
                VS
                <div className="matchCardCountry">
                    <img src={match.secondCountry.logo} alt="" className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.secondCountry.countryName}</span>
                </div>
            </div>
            <div className="matchCardCounter">
                    <span className="timeLeftLabel">Match Time</span>
                    <span className="timeLeft">{match.matchTime}</span>
            </div>
        </div>
     );
}
 
export default MatchCardAdm;
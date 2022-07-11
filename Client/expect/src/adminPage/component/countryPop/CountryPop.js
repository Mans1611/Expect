
import '../PopAddMatch/popaddmatch.scss';

const CountryPop = ({countryName,logo}) => {
    return ( 
        <div className="countryHeader">
            <img className='countryFlage' src={logo} alt={countryName} />
            <span className="countrylable">{countryName}</span>
        </div>
     );
}
 
export default CountryPop;
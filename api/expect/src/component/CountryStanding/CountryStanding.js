import React from 'react'
import UserRow from '../TeamComponent/MyTeam/TeamTable/UserRow';
import CountryRow from './CountryRow';
import './countrystanding.scss';
import CoutryStandingHeader from './CoutryStandingHeader';
const CountryStanding = ({groupName,groupStanding}) => {
  return (
    <div className='CountryStanding'>
        <div className="header">
            <h1>Group {groupName} </h1>
        </div>
        <div className="countriesgroup-container">
            <CoutryStandingHeader/>
           

            {groupStanding.length === 0 ?
                <div className="noContent">No Data avaliable for this group</div> 
                : 
                groupStanding.map((country,index)=> 
                <CountryRow 
                key={index}
                standing = {index+1}
                country = {country}
                /> ) 
                
              }
            
        </div>
    </div>
  )
}

export default CountryStanding;

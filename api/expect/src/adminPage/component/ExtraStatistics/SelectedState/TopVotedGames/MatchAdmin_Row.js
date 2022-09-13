import React from 'react'

const MatchAdmin_Row = ({match,order}) => {
  return (
    <div className='users-row'>
        <div className='row games'>
            <span className="field">{order}</span>
            <span className="field">{match.matchId}</span>
            <div className="flages">
                <img src={match.firstCountry.logo} alt={match.firstCountry.countryName} className="logo" />
                VS
                <img src={match.secondCountry.logo} alt={match.secondCountry.countryName} className="logo" />

            </div>
            <span className="field">{match.matchStatus}</span>
            <span className="field">{match.votes}</span>
        </div>
    </div>
  )
}

export default MatchAdmin_Row
import React from 'react'

const CountryAdmin_Row = ({country,order}) => {
  return (
    <div className='users-row '>
        <div className='row selectedCountries '>
            <span className="field">{order}</span>
            <span className="field">{country._id}</span>
            <span className="field">{country.total}</span>
        </div>
    </div>
  )
}

export default CountryAdmin_Row
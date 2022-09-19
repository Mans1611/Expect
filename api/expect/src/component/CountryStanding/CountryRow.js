import React from 'react'
import { Link } from 'react-router-dom';
import '../../adminPage/component/Standing/standing.scss';

const CountryRow = ({standing,country,gd}) => {
  return (
        <Link to ={`/country/${country.countryName}`}>
    <div className="row tableRow user group-standing" >
          <span className="tableHead-item">{standing}</span>
          <div className="countryholder">
              <img src={country.logo} />
              <span>{country.countryName}</span>
              </div>
          <span className="tableHead-item">{gd?gd:0}</span>
          <span className="tableHead-item">{country.goalScored.group - country.goalRecieved.group}</span>
          <span className="tableHead-item">{country.points}</span>
      </div>
    </Link>
  )
}

export default CountryRow;
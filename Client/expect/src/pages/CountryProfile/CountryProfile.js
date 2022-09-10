import React from 'react'
import './countryProfile.scss';

import { useParams } from 'react-router-dom'
import Axios from '../../Axios/axios';
import { useEffect,useState } from 'react';
import Loading from '../../component/loading/big.loading/Loading';
import PerviousMatches from '../../component/CountryProfile/Matches/PerviousMatches';
import NextMatches from '../../component/CountryProfile/NextMatches/NextMatches';
import { globalUser } from '../../Context/HomeContext';
import TopPlayers from '../../component/TopPlayers/TopPlayers';
import TopPlayersCountry from '../../component/TopPlayersCountry.js/TopPlayersCountry';
import CountryStanding from '../../component/CountryStanding/CountryStanding';

const CountryProfile = () => {
    const {countryName} = useParams();
    document.title = countryName;
    
    const [country,setCountry] = useState(null);
    const [loading,setLoading] = useState(true);
    const [previousMatches,setPreviousMatches] = useState([])
    const [nextMatches,setNextMatches] = useState([]);
    const [userEpections,setUSerExpections] = useState([]);
    const [group,setGroup] = useState([])
    const [totalPoints,setTotalPoints] = useState(null)
    const {isDark, userGlob,token,expectedMatches} = globalUser();
   
    useEffect(()=>{
        let isSubscribe = true;
        const fetchCountry = async()=>{
            const {data} = await Axios.get(`/country/${countryName}`);
            setCountry(data.country);
            const { data : matchesData} = await Axios.get(`/matches/country/${countryName}`);
            if (isSubscribe) {
                setPreviousMatches(matchesData.pre);
                setNextMatches(matchesData.next);
                setTotalPoints(data.totalPoints);
                setGroup(data.table);
            }
            setLoading(false);
        }

        fetchCountry();
    },[countryName]);


    if(loading)
        return <Loading/>
    
  return (
    <div className={`country-Page ${isDark? 'dark' : ''}`}>
        <div className="countryHeader">
            <div className="countryavatar">
                <img src={country.logo} alt={country.countryName} className="country-logo" />
                <h1 className="countryName">{country.countryName}</h1>
            </div>

            <div className="countryDetails">
                <div className="detail">
                    <span className="key">Group</span>
                    <span className="value">{country.group}</span>
                </div>
                <div className="detail">
                <span className="key">Total Players Points</span>
                    <span className="value">{totalPoints}</span>
                </div>
                <div className="detail"></div>
            </div>
        </div>

        <div className="matches">
            <div className="perviousMatches">
                <PerviousMatches previousMatches = {previousMatches}/>
            </div>
            <div className="nextMatches">
                <NextMatches nextMatches = {nextMatches} />
            </div>
        </div>
            <div className="matches">
                <TopPlayersCountry countryName = {countryName} />
                <div className="countryStanding-container">
                    <CountryStanding 
                        groupName={country.group} 
                        groupStanding = {group}
                        />
                </div>
            </div>
        </div>
  )
}

export default CountryProfile
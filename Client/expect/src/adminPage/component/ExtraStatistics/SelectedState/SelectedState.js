import React from 'react'
import TopPlayers from '../../../../component/TopPlayers/TopPlayers'
import TopVotes from '../../../../component/TopVotes/TopVotes'
import RoundStanding from '../../RoundStanding/RoundStanding'
import TopUsersInGame from '../TopUSersInGame/TopUsersInGame'
import TopSelectedCountries from './TopSelectedCountries/TopSelectedCountries'
import TopVotedGames from './TopVotedGames/TopVotedGames'

const SelectedState = ({selected}) => {
    switch(selected){
        case "Top players" : 
            return <TopPlayers/>
        case "Top voted Players" : 
            return <TopVotes/>
        case "Top voted Games" : 
            return <TopVotedGames/>
        case "Top selected Countries" : 
            return <TopSelectedCountries/>
        case "Top Users In Round" : 
            return <RoundStanding/>
        case "Top Users In Match" : 
            return <TopUsersInGame/> ;

    }
    
}

export default SelectedState
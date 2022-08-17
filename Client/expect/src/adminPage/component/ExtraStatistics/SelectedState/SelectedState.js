import React from 'react'
import TopPlayers from '../../../../component/TopPlayers/TopPlayers'
import TopVotes from '../../../../component/TopVotes/TopVotes'
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
        case "" : 
            return null

    }
    
}

export default SelectedState
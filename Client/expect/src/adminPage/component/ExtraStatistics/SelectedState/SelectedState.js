import React from 'react'
import TopPlayers from '../../../../component/TopPlayers/TopPlayers'
import TopVotes from '../../../../component/TopVotes/TopVotes'

const SelectedState = ({selected}) => {
    switch(selected){
        case "Top players" : 
            return <TopPlayers/>
        case "Top voted Players" : 
            return <TopVotes/>
        case "Top players" : 
            return <>MAnsour</>
        case "Top voted Games" : 
            return <>Top voted Games.</>
        case "top Teams" : 
            return <>top Teams.</>
        case "" : 
            return null

    }
    
}

export default SelectedState
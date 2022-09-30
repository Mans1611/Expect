

export const calculateGoldenPlayerPoints = (goldenPlayer,matches)=>{
    
    const countryName = goldenPlayer.player.countryName;
    const playerName = goldenPlayer.player.playerName;

    let matchDetails = [];
    let playerPoints = 0;
    let currentPlayerPoints = 0;
    let previousPlayerPoints = 0;
    matches.forEach((match)=> {
        // the down condition below is to check that the picking time was before match time.

        let condition = ( (new Date(match.matchTime).getTime() - new Date(goldenPlayer.player.pickedTime).getTime()) > 0 )  && (match.firstCountry.countryName === countryName || match.secondCountry.countryName === countryName)
        
        if( condition){

            if(match.firstCountry.players[goldenPlayer.player.index].playerName === playerName){
                playerPoints += match.firstCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
                const detail = {
                    points : match.firstCountry.players[goldenPlayer.player.index].playerPoints,
                    opponent : match.secondCountry.countryName,
                    logo :  match.secondCountry.logo,
                    stage : match.round,
                } 

                matchDetails.push(detail)

            }else{
                playerPoints +=  match.secondCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
                const detail = {
                    points : match.secondCountry.players[goldenPlayer.player.index].playerPoints,
                    opponent : match.firstCountry.countryName,
                    logo :  match.firstCountry.logo,
                    stage : match.round,
                } 
                matchDetails.push(detail)

            }
            console.log(match )
        }


    })
    
    // if(goldenPlayer.old_Player) 
    //     playerPoints += goldenPlayer.old_Player.goldenPlayerPoints;
    
    return {playerPoints,matchDetails}



}

// goldenPlayerPoints += match.firstCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
//goldenPlayerPoints += match.secondCountry.players[goldenPlayer.player.index].playerPoints * 2  ;

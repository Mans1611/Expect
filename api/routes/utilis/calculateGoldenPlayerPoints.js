

export const calculateGoldenPlayerPoints = (goldenPlayer,matches)=>{
    const countryName = goldenPlayer.player.countryName;
    const playerName = goldenPlayer.player.playerName;

    let playerPoints = 0;
    let matchDetails = [];

    matches.forEach((match)=> {
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
            

        }
    })
    if(goldenPlayer.old_Player) // in case of the player change his golden player.
        playerPoints += goldenPlayer.old_Player.doublePoints;
    
    return {playerPoints,matchDetails}



}

// goldenPlayerPoints += match.firstCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
//goldenPlayerPoints += match.secondCountry.players[goldenPlayer.player.index].playerPoints * 2  ;

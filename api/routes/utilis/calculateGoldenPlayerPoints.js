

export const calculateGoldenPlayerPoints = (goldenPlayer,matches)=>{
    const countryName = goldenPlayer.player.countryName;
    let playerPoints = 0;

    matches.forEach((match)=> {
        let condition = ( (new Date(match.matchTime).getTime() - new Date(goldenPlayer.player.pickedTime).getTime()) > 0 )  && (match.firstCountry.countryName === countryName || match.secondCountry.countryName === countryName)
        if( condition){
            playerPoints += match.firstCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
            playerPoints +=  match.secondCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
        }
    })
   
    return playerPoints



}

// goldenPlayerPoints += match.firstCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
//goldenPlayerPoints += match.secondCountry.players[goldenPlayer.player.index].playerPoints * 2  ;



export const calculateGoldenPlayerPoints = (goldenPlayer,matches)=>{
    const countryName = goldenPlayer.player.countryName;
    let playerPoints = 0;

    matches.forEach((match)=> {
        console.log(match.matchTime)
        let condition = (new Date(match.matchTime).getTime() - new Date(goldenPlayer.player.pickedTime).getTime()) && (match.firstCountry.countryName === countryName || match.secondCountry.countryName === countryName)
        if( condition){
            playerPoints += match.firstCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
            playerPoints +=  match.secondCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
        }
    })
    console.log("golden player points is " + playerPoints);
    return playerPoints



}

// goldenPlayerPoints += match.firstCountry.players[goldenPlayer.player.index].playerPoints * 2  ;
//goldenPlayerPoints += match.secondCountry.players[goldenPlayer.player.index].playerPoints * 2  ;

export default  function addingPointsPlayer(player,countryName,match){
    let points = 0;
    switch (player.state) {
        case "Score Long Goal (6PTS)":
            points = 6;
            break;
        case "Score Goal From Free Kick (6PTS)":
            points = 6;
            break;
        case "Score Goal (5PTS)":
            points = 5;
            break;
        case "Make ASSIST (3PTS)":
            points = 3;
            break;
        case "Score Penalty (3PTS)":
            points = 3;
            break;
        case "Make Penalty(2PTS)":
            points = 2;
            break;
        case "Conced Penalty (-2PTS)":
            points = -2;
            break;
        case "Score Own Goal (-3PTS)":
            points = -3;
            break;
        case "Take Red Card (-4PTS)":
            points = -4;
            break;
    
        default:
            break;
    }

    if(match.firstCountry.countryName === countryName){
        match.firstCountry.players.forEach((val)=>{
            if(val.playerName === player.playerName){
                val.playerPoints+=points;
            }   
        })
    }
    else if(match.secondCountry.countryName === countryName){
    match.secondCountry.players.forEach((val)=>{
        if(val.playerName === player.playerName){
            val.playerPoints+=points;
        }   
    })

}

   return match;

    
    


}
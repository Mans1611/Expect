
// player states
export default  function addingPointsPlayer(player,countryName,match){
    let points = 0;
    switch (player.state) {
        case "Score Goal From Free Kick (6PTS)":
            points = 6;
            break;
        case "Score Long Goal (5PTS)":
            points = 5;
            break;
        case "GoalKeeper Saves Penalty (5PTS)":
            points = 5;
            break;
        case "Score Goal (4PTS)":
            points = 4;
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
        case "GoalKeeper Saves A Chance (1PTS)":
            points = 1;
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

    
    
    // this to add for both countries by else statment 
    // it will iterate over each player(NOT USERS) and add his points

    if(match.firstCountry.countryName === countryName){
        match.firstCountry.players[player.index].playerPoints+=points;

        // the below state it just for player profile statistics.
        if(player.state.includes('Score'))
            match.firstCountry.players[player.index].goals++;
        else if(player.state.includes('ASSIST'))
            match.firstCountry.players[player.index].assist++;
        else if(player.state.includes('Red'))
            match.firstCountry.players[player.index].redCard++;
        else if(player.state.includes('Yellow'))
            match.firstCountry.players[player.index].yellowCard++;
        else if(player.state.includes('Saves Penalty'))
            match.firstCountry.players[player.index].penaltySaved++;
        else if(player.state.includes('Of The Match'))
            match.firstCountry.players[player.index].manOfTheMatch++;
    }
    
    else if(match.secondCountry.countryName === countryName){
        match.secondCountry.players[player.index].playerPoints+=points;
        if(player.state.includes('Score'))
            match.secondCountry.players[player.index].goals++;
        else if(player.state.includes('ASSIST'))
            match.secondCountry.players[player.index].assist++;
        else if(player.state.includes('Red'))
            match.secondCountry.players[player.index].redCard++;
        else if(player.state.includes('Yellow'))
            match.secondCountry.players[player.index].yellowCard++;
        else if(player.state.includes('Saves Penalty'))
            match.secondCountry.players[player.index].penaltySaved++;
        else if(player.state.includes('Of The Match'))
            match.secondCountry.players[player.index].manOfTheMatch++;



}
console.log(match.firstCountry.players[player.index].playerPoints);

   return match;

    
    


}
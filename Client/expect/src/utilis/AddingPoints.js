export default function AddingPoints(match,expect){
    
    let points = 0;
    
    match.firstCountry.players.find((value,index)=>{
        if(value.playerName === expect.mutatePlayer1.playerName)
            points+= value.playerPoints;
    })
    match.secondCountry.players.find((value,index)=>{
        if(value.playerName === expect.mutatePlayer2.playerName)
            points+= value.playerPoints;
    })
    return points;
}
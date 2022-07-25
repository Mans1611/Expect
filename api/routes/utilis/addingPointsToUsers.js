// in this function we transfer the poinst from the players in the game to the user points of each
// game in mutateplyar i have attached the index of each player so we can reach it in the array
// without searching for it.

export default function AddingPointsToUSers(matches,userExpections){
    let totalPoints = 0
    for(let i = 0; i < userExpections.length;i++){
            
            matches.find((match)=>{
                // so if the matchId matches it will transfer the points of selected from the two countries to the user. 
                if(match.matchId === userExpections[i].matchId){
                    userExpections[i].userPoints += match.firstCountry.players[userExpections[0].mutatePlayer1.index].playerPoints;
                    userExpections[i].userPoints += match.secondCountry.players[userExpections[0].mutatePlayer1.index].playerPoints;
                    totalPoints += userExpections[i].userPoints;
                }
            })
        }

       
    return  {userExpections,totalPoints};
    }



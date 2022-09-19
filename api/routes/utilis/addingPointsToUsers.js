// in this function we transfer the poinst from the players in the game to the user points of each
// game in mutateplyar i have attached the index of each player so we can reach it in the array
// without searching for it.



export default async function AddingPointsToUSers(matches,userExpections){
    let totalPoints = 0;
    const start = new Date().getTime();

    for(let i = 0; i < userExpections.length;i++){

            matches.find((match)=>{
                // so if the matchId matches it will transfer the points of selected from the two countries to the user.  
                // userPoints variable is for the points in this expect not for all expects
                if(match.matchId === userExpections[i].matchId){
                    
                    if(!userExpections[i].finalPoints){
                        let matchPoints = 0;

                        matchPoints += Math.floor(match.firstCountry.players[userExpections[i].mutatePlayer1.index].playerPoints * 1.5 ) ;
                        matchPoints += match.firstCountry.players[userExpections[i].mutatePlayer2.index].playerPoints;  
                        matchPoints += Math.floor(match.secondCountry.players[userExpections[i].mutatePlayer3.index].playerPoints * 1.5);
                        matchPoints += match.secondCountry.players[userExpections[i].mutatePlayer4.index].playerPoints;
                            // so this for the winner points it will be calculated just if the match ends (fullTime)

                        let result_Points = 0 ;
                        let WinnerPoints = 0;  
                        let WINNER = null;
                        const winnerMath = match.firstCountry.result - match.secondCountry.result;
                        
                        if(winnerMath > 0 ){
                            WINNER = match.firstCountry.countryName; 
                            WinnerPoints = (WINNER === userExpections[i].winnerValue) ? 2 : 0;
                            matchPoints += WinnerPoints;
                        }
                        else if(winnerMath < 0 ){
                            WINNER = match.secondCountry.countryName; 
                            WinnerPoints = (WINNER === userExpections[i].winnerValue) ? 2 : 0;
                            matchPoints += WinnerPoints;
                        }
                        else if(winnerMath == 0 ){
                            WINNER = "draw"; 
                            WinnerPoints = (WINNER === userExpections[i].winnerValue) ? 3 : 0;
                            matchPoints += WinnerPoints;
                        }
                        if(match.fullTime){
                            let difference = 0;
                            difference = Math.abs(match.firstCountry.result - userExpections[i].result1_value) + Math.abs(match.secondCountry.result - userExpections[i].result2_value);
                            
                            switch(difference){
                                case 0 : 
                                    result_Points = 5;
                                    matchPoints += result_Points;
                                    break;
                                    case 1 : 
                                    result_Points = 3 ;
                                    matchPoints += result_Points;
                                    break;
                                    case 2 : 
                                    result_Points = 1 ;
                                    matchPoints += result_Points;
                                    break;
                                default : 
                                    result_Points = 0;
                            }

                        }
                            // for result points calculations 
                            
                        /* so in this code beleow we just add two more property which is WinnerPoints & result_points 
                        / just to show them in the client side when the match ended.*/
                        userExpections[i].WinnerPoints = WinnerPoints;
                        userExpections[i].result_Points = result_Points;
                        userExpections[i].userPoints = matchPoints;
                        totalPoints += matchPoints;

                        if(match.deadMatch)
                            userExpections[i].finalPoints = matchPoints;

                        }
                        
                        else{
                            totalPoints+= userExpections[i].finalPoints;
                        }
                    }
               
                // this if condition for golden Player
                
                
            })

        }
        const end = new Date().getTime()
      
    return  {userExpections,totalPoints};
    }



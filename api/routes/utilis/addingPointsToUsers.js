// in this function we transfer the poinst from the players in the game to the user points of each
// game in mutateplyar i have attached the index of each player so we can reach it in the array
// without searching for it.



export default async function AddingPointsToUSers(matches,userExpections,goldenPlayer){
    let totalPoints = 0;

    for(let i = 0; i < userExpections.length;i++){

            matches.find((match)=>{
                // so if the matchId matches it will transfer the points of selected from the two countries to the user.  
                // userPoints variable is for the points in this expect not for all expects
                let matchPoints = 0;
                if(match.matchId === userExpections[i].matchId){
                   matchPoints += Math.floor(match.firstCountry.players[userExpections[i].mutatePlayer1.index].playerPoints * 1.5 ) ;
                   matchPoints += match.firstCountry.players[userExpections[i].mutatePlayer2.index].playerPoints;  
                   matchPoints += Math.floor(match.secondCountry.players[userExpections[i].mutatePlayer3.index].playerPoints * 1.5);
                   matchPoints += match.secondCountry.players[userExpections[i].mutatePlayer4.index].playerPoints;
                     // so this for the winner points it will be calculated just if the match ends (fullTime)

                     let result_Points = 0 , WinnerPoints = 0;  
                       
                     if(match.fullTime){
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
                        }
                        // for result points calculations 
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
                    /* so in this code beleow we just add two more property which is WinnerPoints & result_points 
                    / just to show them in the client side when the match ended.*/
                    userExpections[i].WinnerPoints = WinnerPoints;
                    userExpections[i].result_Points = result_Points;
                    userExpections[i].userPoints = matchPoints;
                    totalPoints += matchPoints;
                }
                // this if condition for golden Player
                
                
            })

        }
    return  {userExpections,totalPoints};
    }



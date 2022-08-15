// in this function we transfer the poinst from the players in the game to the user points of each
// game in mutateplyar i have attached the index of each player so we can reach it in the array
// without searching for it.

//import expects from "../../models/Expects.js";

export default async function AddingPointsToUSers(matches,userExpections){
    let totalPoints = 0;

    for(let i = 0; i < userExpections.length;i++){
            matches.find((match)=>{
                // so if the matchId matches it will transfer the points of selected from the two countries to the user.  
                // userPoints variable is for the points in this expect not for all expects
                let matchPoints = 0;
                if(match.matchId === userExpections[i].matchId){
                   matchPoints += match.firstCountry.players[userExpections[i].mutatePlayer1.index].playerPoints;
                   matchPoints += match.secondCountry.players[userExpections[i].mutatePlayer2.index].playerPoints;  
                   
                     // so this for the winner points it will be calculated just if the match ends (fullTime) 
                
                        if(match.fullTime){
                            let WINNER = null, WinnerPoints = 0;
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
                    
                    userExpections[i].userPoints = matchPoints;
                    totalPoints += matchPoints;
                }  
            })
        }
    return  {userExpections,totalPoints};
    }



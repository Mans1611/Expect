


const CreatingExpect = (playersState,subs,Points = 0) =>{

        const winnerValue = document.querySelector('input[name="countryWinner"]:checked').id;
        const result1_value = document.querySelector('input[id="result_1"]').value;
        const result2_value = document.querySelector('input[id="result_2"]').value;
        let  expectObject = null;
        
        if(subs){
            expectObject = 
            {
                winnerValue,
                result1_value,
                result2_value,
                mutatePlayer1 : playersState.player1 ,
                mutatePlayer2 : playersState.player2,
                mutatePlayer3 : playersState.player3,
                mutatePlayer4 : playersState.player4,
              
                subsOut : playersState.subOut
            };
        }
        else{
            expectObject = 
            {
                winnerValue,
                result1_value,
                result2_value,
                mutatePlayer1 : playersState.player1 ,
                mutatePlayer2 : playersState.player2,
                mutatePlayer3 : playersState.player3,
                mutatePlayer4 : playersState.player4,
              
            };
        }
        

            return expectObject;
} 
    export default CreatingExpect;
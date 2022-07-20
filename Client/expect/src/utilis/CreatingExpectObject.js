


const CreatingExpect = (players_1_arr,players_2_arr) =>{

        const winnerValue = document.querySelector('input[name="countryWinner"]:checked').id;
        const result1_value = document.querySelector('input[id="result_1"]').value;
        const result2_value = document.querySelector('input[id="result_2"]').value;
        const firstPlayer_value = document.querySelector('input[name="firstCountry"]:checked').id;
        let mutatePlayer1,mutatePlayer2;
        players_1_arr.find((player,index)=> {
            
            if(player.playerName === firstPlayer_value){
                mutatePlayer1 = {...player,index:index};
            }
        }) 
        const secondPlayer_value = document.querySelector('input[name="secondCountry"]:checked').id;
        
        players_2_arr.find((player,index)=> {
            if(player.playerName === secondPlayer_value){
                mutatePlayer2 = {index:index,...player};
            }
        }) 
        const expectObject = 
            {
                winnerValue,
                result1_value,
                result2_value,
                mutatePlayer1,
                mutatePlayer2,
            };

            return expectObject;
} 
    export default CreatingExpect;
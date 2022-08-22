
export const statePlayers = {
    showPlayer1 : false,
    showPlayer2 : false,
    showPlayer3 : false,
    showPlayer4 : false,
    player1 : null,
    player2 : null,
    player3 : null,
    player4 : null
}


export const ReducePlayerFn = (state,action)=>{
    switch(action.type){
        case 'showFirstCountryPlayer1' : 
            state.showPlayer2 = state.showPlayer3 = state.showPlayer4 = false; 
            return {...state, showPlayer1 : true,selected : 1};
        case 'showFirstCountryPlayer2' : 
            state.showPlayer1 = state.showPlayer3 = state.showPlayer4 = false; 
            return {...state, showPlayer2 : true,selected : 2};
        case 'showSecondCountryPlayer1' : 
            state.showPlayer1 = state.showPlayer2 = state.showPlayer4 = false; 
            return {...state, showPlayer3 : true,selected : 3};
        case 'showSecondCountryPlayer2' : 
            state.showPlayer1 = state.showPlayer2 = state.showPlayer3 = false; 
            return {...state, showPlayer4 : true,selected : 4};
    
        case 'PlayerSelect1' : 
            return {...state, player1 : action.payload};
       
        case 'PlayerSelect2' : 
            return {...state,player2 : action.payload };
       
        case 'PlayerSelect3' : 
            return {...state,player3 : action.payload };
       
        case 'PlayerSelect4' : 
            return {...state,player4 : action.payload };
       
       
        }


}

export const goalKeeper_postion = "GK";
export const DEF_Position = "CB RB LB"; 
export const MID_Position = "CDM CM RM LM CAM"; 
export const ATT_Position = "FW SS LW RW"; 


export const detectPosition = (postion)=>{
    
    const regEXP = new RegExp(postion,'ig');

    let checking = goalKeeper_postion.match(regEXP);

    if(checking)
        return "GoalKeeper";
    
    checking = DEF_Position.match(regEXP);
    if(checking)
        return "DEF";

    checking = MID_Position.match(regEXP);
    if(checking)
        return "MID";

    checking = ATT_Position.match(regEXP);
    if(checking)
        return "ATT";

}

export const statePlayers = {
    showPlayer1 : false,
    showPlayer2 : false,
    showPlayer3 : false,
    showPlayer4 : false,
    player1 : null,
    player2 : null,
    player3 : null,
    player4 : null,
    player1_position : null,
    player2_position : null,
    player3_position : null,
    player4_position : null
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
            console.log(action.payload.position); 
            return {
                    ...state, 
                    player1 : action.payload , 
                    player1_position : detectPosition(action.payload.position)
                };
       
        case 'PlayerSelect2' : 
            return {
                ...state,
                player2 : action.payload, 
                player2_position : detectPosition(action.payload.position) 
            };
            
            case 'PlayerSelect3' : 
            return {
                ...state,
                player3 : action.payload ,
                player3_position : detectPosition(action.payload.position) 
                
            };
            
            case 'PlayerSelect4' : 
            return {
                ...state,
                player4 : action.payload,
                player4_position : detectPosition(action.payload.position) 
             }
             
            }


        


}
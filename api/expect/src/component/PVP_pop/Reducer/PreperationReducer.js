export const preperationObj = {
    opponent_1_ready : false, 
    opponent_2_ready : false,
    opponent_1_turn : false,
    opponent_2_turn : false,
    opponent_1_pickedPlayer : null,
    opponent_2_pickedPlayer : null,
} 

export const preperationFn = (state,actions)=>{
    switch(actions.type){
        case 'Oppnent1 is ready' : 
            return {...state, opponent_1_ready : true};
        case 'Oppnent2 is ready' : 
            return {...state, opponent_2_ready : true};

    }
}
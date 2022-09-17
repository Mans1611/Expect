export const initPick_Player = {
    msg : null,
    color:'red',
    showMsg : false
}

export const ReduceFn = (states,action) =>{
    switch(action.type){
        case 'invalid' :
            return {
                color : 'red',
                showMsg : true,
                msg : action.payload
            }
        case 'success' :
            return {
                color : 'green',
                showMsg : true,
                msg : action.payload
            } 
    }
} 
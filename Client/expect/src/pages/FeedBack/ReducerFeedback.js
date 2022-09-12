export const initObject = {
    showMsg : false,
    msg : '',
    color : null
}
export const reduceFn = (state,action)=>{
    switch(action.type){
        case 'empty inputs' :
            return {showMsg : true , msg : "Check your inputs inputs", color: 'red'};
        case 'remove msg':
            return { ...state , showMsg : false }    
        case 'success':
            return  {showMsg : true , msg : "Your Feedback is sent successfully, we will work hard to apply it ", color: 'green'};

    }
}


export const initState = {
    selected : 'first',
    page : 'Feedback',
    showVerify : false
 }


export  const reduceFn = (state,action)=>{
    switch(action.type){
        case 'changeToSupport' : 
            return {selected : "second" , page : "Support & Help",showVerify : true}
        case 'changeToFeedback' : 
            return {selected : "first" , page : "Feedback" , showVerify : false}
    }
 }


export const InviteState = {
    msg : null,
    showMsg : false,
    color : null,
}

export const reduceInviteFn = (state,action)=>{
    switch(action.type){
        case 'empty' : 
            return {
                msg : "Please Provide Username",
                showMsg : true,
                color : 'red',
                showButton : true
            };
        case 'done' : 
            return {
                msg : "invitation is sent",
                showMsg : true,
                color : 'green',
                showButton : false
            } 
        case 'NotFound' : 
            return {
                msg : "This Username is not found",
                showMsg : true,
                color : 'red',
                showButton : true
            }
        case 'sameUser' : 
            return {
                msg : "You can't send invitation to yourself",
                showMsg : true,
                color : 'red',
                showButton : true

            }
        case 'hide' : 
            return {
                showMsg : false,
                msg : null,
                color : null,
                showButton : true
            }
    }
}
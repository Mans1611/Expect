
export const pvpObject = {
    invitationStatus : null,
    invitation : null

}


export const PVP_Fn = (state,actions) => {
    switch(actions.type){
        case 'NoInvitations' :
            return {invitationStatus : null};

        case 'pendingInvitations' :  
            return {invitationStatus : "Pending", invitation : actions.payload};

        case 'Accepted' : 
            return { invitationStatus : "Accepted" ,invitation : actions.payload};

    }
}
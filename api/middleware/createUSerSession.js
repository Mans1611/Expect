

const CreateUserSession = (req)=>{
    req.session.user = {
        isAdmin : false,
        userName: req.body.userName,     
    };
   
    return req;
}

export default CreateUserSession;
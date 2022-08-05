

const CreateUserSession = (req)=>{
    req.session.user = {
        isAdmin : false,
        userName: req.body.userName,     
    };
    console.log("sessionn is created");
    return req;
}

export default CreateUserSession;
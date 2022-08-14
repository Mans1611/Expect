
const Filter_User_Expects_4Team = (userExpects,joinedTime)=>{
    const user_Expects_To_Team = userExpects.filter(expect=> {
        const time = new Date(expect.matchTime).getTime() - new Date(joinedTime).getTime();
        // if time (+) (he joinde team before match starts) => that mean that his expects will added to the team, since match not started 
        // if time (-) (he joinde team after match starts) => that mean that his expects will not added to the team, since match started 
        console.log(expect.matchTime);
        console.log(new Date(joinedTime));
        if(time > 0)
            return expect
    
        }  
    )


    return user_Expects_To_Team;
}

export default Filter_User_Expects_4Team;
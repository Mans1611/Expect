import Teams from "../../models/Teams.js";
import User from "../../models/User.js";

// this function sort the team and give each team its standing 
const SortingTeams = async()=>{
    const orderedTeams = await Teams.find().sort({teamPoints:-1})
    /* as the bulkwrite access many documents so I use map and return all the ordered docs
       with assigning standing to each team*/
    await Teams.bulkWrite(
        orderedTeams.map((team,index)=>
            ({
                updateOne : {
                    filter : {teamName : team.teamName},
                    update : {teamStanding : index + 1}
                }
            }
            )
        )
    );
}

const SortingUsers = async () =>{
    const Ordered_Users = await User.find().sort({userPoints:-1});
    await User.bulkWrite(
        Ordered_Users.map((user,index)=>(
            {
                updateOne : {
                    filter : {userName : user.userName},
                    update : {userStanding : index + 1}
                }
            }
        ))
    )
}
export {SortingTeams,SortingUsers} ; 

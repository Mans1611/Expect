import react from 'react';
import { Link } from 'react-router-dom';


const TeamInstructions = ()=>{
    return (
        <div className="teamInstruction">
            <h1>Team Details</h1>
            <div className="detailsContainer">
                <h4> &gt; You can join <span className='redflag'>only one</span> team.</h4>
                <h4> &gt;  <span className='redflag'>Maximum</span> number of members of each team is <span className='redflag'>5</span> .</h4>
                <h4> &gt; You Can Create and join a Team of your friends via team code.</h4>
                <h4> &gt; Your Expects Will be Counted with the team <span className='redflag'>after your joining </span> to team.</h4>
                <h4> &gt; If you <span className='redflag'>left</span>   your team, and you were the <span className='redflag'>onlyone</span>, your team data will be <span className='redflag'>lost</span>.</h4>
                <h4> &gt; If You left your team, your share points will be counted to the team, it Won’t be removed.</h4>
            </div>
            <div className="instructionButton-wrapper">
                <Link to="/expect/team/teamjoin">
                    <button className="createJoin">Create or Join Team</button>
                </Link>
            </div>
        </div>
    )
}

export default TeamInstructions;
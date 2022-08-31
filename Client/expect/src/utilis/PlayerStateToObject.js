
// this function is mainly about just coverting the state into Object
// and to assign the state icon to that object to be displayed in the states
const PlayerStateToObject = (playerName,state,country,min,index)=>{
    let icon = null;

    
    switch (state) {
        case "Score Long Goal (6PTS)":
            icon = "http://www.banglacentre.com/wp-content/uploads/2013/06/game-sport-football-kick-ball-goal-league-player-33d581e26d0d5ed4-512x512.png";
            break;
        case "Score Goal From Free Kick (6PTS)":
            icon = "https://cdn-icons-png.flaticon.com/512/2471/2471609.png";
            break;
        case "Score Goal (5PTS)":
            icon = "https://cdn-icons-png.flaticon.com/512/2726/2726007.png";
            break;
        case "Make ASSIST (3PTS)":
            icon = "https://cdn0.iconfinder.com/data/icons/football-soccer-vivid-vol-1-2/256/Assist-512.png";
            break;
        case "Score Penalty (3PTS)":
            icon = "https://cdn-icons-png.flaticon.com/512/2716/2716196.png";
            break;
        case "Make Penalty(2PTS)":
            icon = "https://cdn-icons-png.flaticon.com/512/1654/1654413.png";
            break;
        case "Conced Penalty (-2PTS)":
            icon = "https://cdn2.iconfinder.com/data/icons/football-soccer-player/342/football-soccer-player-013-512.png";
            break;
        case "Score Own Goal (-3PTS)":
            icon = "https://e1.365dm.com/score-centre/icons/own_goal.svg";
            break;
        case "Take Red Card (-4PTS)":
            icon = "https://cdn-icons-png.flaticon.com/512/451/451718.png";
            break;
    
        default:
            icon = null;
            break;
    }


    return {playerName,state,country,min,icon:icon,index};
}

export {PlayerStateToObject};
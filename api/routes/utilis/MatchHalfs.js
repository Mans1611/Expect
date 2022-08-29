// this function is for pausing and resuming the match 

const MatchHalfs = (match,status)=>{
    const icon = 'https://www.pngrepo.com/png/277622/512/whistle.png';

    switch(status){

        case 'Start Match' : {
            match.started = true;
            match.matchStatue = "GoingOn";
            break;
        } 
        case 'End First Half' : {
            match.matchStatue = 'HT';            
            match.states.push({playerName : "",state : `Half Time ${match.firstCountry.result} - ${match.secondCountry.result} `, min : "HT" , icon,country:'both'});       
            break;
        }
        case 'Start Second Half' : {
            match.matchStatue = 'GoingOn';
            const now = new Date();
            match.time.secondHalf_start = now;
            break;
        }

        case 'End Second Half' : {
            match.matchStatue = 'ET';
            match.states.push({playerName : "",state : `Full Time ${match.firstCountry.result} - ${match.secondCountry.result} `, min : "FT" , icon,country:'both'});     
            break;
        }
        case 'Start First Extra Time' : {
            match.matchStatue = 'GoingOn';
            const now = new Date();
            match.time.firstExtra_start = now;
            break;
        }
        case 'End First Extra Time' : {
            match.matchStatue = 'Pause';
            break;
        }

        case 'Start Second Extra Time' : {
            match.matchStatue = 'GoingOn';
            const now = new Date();
            match.time.secondExtra_start = now;
            break;
    }
        case 'FullTime' : {
            match.matchStatue = 'FT';
            match.fullTime = true;
            match.states.push({playerName : "",state : `Full Time ${match.firstCountry.result} - ${match.secondCountry.result} `, min : "FT" , icon,country:'both'}); 

            break;
        }

    }
    return match;
}
export {MatchHalfs};
import { matches } from "../data";

const initState = {
    dark : false,
    matches: matches,
}
 const Reducer = (state = initState,action)=>{
    if(action.type === 'INCREASE'){
        return {counter:state.counter + 1};
    }
    else if(action.type === 'DECREASE'){
        return {counter:state.counter - 1};
    }
    else if (action.type === 'TOGGLE'){
        return {dark:!(state.dark),matches:matches}
    }

    return initState;
}

export default Reducer;

